using AutoMapper;
using CartProduct.Data;
using CartProduct.Data.Entities;
using CartProduct.Data.Entities.Identity;
using CartProduct.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private EFContext _context { get; set; }
        private UserManager<AppUser> _userManager { get; set; }
        private IMapper _mapper { get; set; }
        public ProductController(EFContext context, UserManager<AppUser> userManager,
            IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }
        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                return await Task.Run(() =>
                {
                    return Ok(new
                    {
                        Products = _context.Products.ToList()
                    });
                });
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("getcart")]
        public async Task<IActionResult> GetCart([FromBody] string email)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);
                var cart = _context.Carts
                    .FirstOrDefault(x => x.UserId == user.Id);
                var products = _context.CartProducts.Include(x => x.Product).Where(x => x.CartId == cart.Id)
                    .Select(x => new
                    {
                        product = x.Product,
                        count = x.counter
                    }).ToList();

                return Ok(new
                {
                    Products = products
                });
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("getitem")]
        public async Task<IActionResult> GetProductItem([FromBody] ProductAddToCartViewModel productCart)
        {
            try
            {
                var product = _context.Products.Where(x => x.Id == productCart.ProductId).FirstOrDefault();

                if (!string.IsNullOrEmpty(productCart.UserEmail))
                {
                    var user = await _userManager.FindByEmailAsync(productCart.UserEmail);
                    var cart = _context.Carts.FirstOrDefault(x => x.UserId == user.Id);
                    var appProduct = _context.CartProducts.FirstOrDefault(x => x.CartId == cart.Id
                    && x.ProductId == product.Id);
                    if (appProduct == null)
                    {
                        AppCartProduct cartProduct = new AppCartProduct();
                        cartProduct.Product = product;
                        cartProduct.Cart = cart;
                        cartProduct.counter = 1;

                        _context.CartProducts.Add(cartProduct);
                    }
                    else
                    {
                        appProduct.counter = (appProduct.counter + 1);
                    }
                    _context.SaveChanges();
                }

                ProductReturnViewModel returnViewModel = _mapper.Map<ProductReturnViewModel>(product);

                return Ok(new
                {
                    product = returnViewModel,
                });
            }
            catch (Exception ex) 
            {
                return BadRequest(ex);  
            }
        }

        [HttpPost]
        [Route("remcart")]
        public async Task<IActionResult> RemoveFromCart([FromBody] int id) 
        {
            try
            {

                string email = User.FindFirst("username")?.Value;
                var user = await _userManager.FindByEmailAsync(email);

                var products = _context.CartProducts.Include(x => x.Cart).Include(x => x.Product)
                    .Where(x => x.ProductId == id && x.Cart.UserId == user.Id).Select(x => x);

                var product = _mapper.Map<ProductReturnViewModel>(
                    products
                    .FirstOrDefault().Product);
                var counter = products.FirstOrDefault().counter;

                _context.CartProducts.RemoveRange(products);
                _context.SaveChanges();

                return Ok(new
                {

                    products = product,
                    count = counter
                }
                );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("addtocart")]
        public async Task<IActionResult> AddToCartItems([FromBody] PlusCartItem cartItem) 
        {
            var item = _context.CartProducts.Include(x => x.Product).Where(x => x.Product.Id == cartItem.Id)
                .FirstOrDefault();
            item.counter = cartItem.Count;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Route("removetocart")]
        public async Task<IActionResult> RemoveToCartItems([FromBody] PlusCartItem cartItem)
        {
            if (cartItem.Count > 0)
            {
                var item = _context.CartProducts.Include(x => x.Product).Where(x => x.Product.Id == cartItem.Id)
                    .FirstOrDefault();
                item.counter = cartItem.Count;
                await _context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddProduct([FromForm] ProductAddViewModel model) 
        {
            string code = Guid.NewGuid().ToString();
            var product = new Product
            {
                Name = model.Name,
                Description = model.Description,
                Code = code,
                Category = "Category",
                InventoryStatus = model.InventoryStatus,
                Quantity = 1,
                Rating = 2,
                Price = model.Price,

            };
            string fileName = "";
            if (model.Image != null) 
            {
                fileName = Path.GetRandomFileName() + Path.GetExtension(model.Image.FileName);
                string dirName = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), "Images");
                string fullPath = Path.Combine(dirName, fileName);

                using (var stream = System.IO.File.Create(fullPath)) 
                {
                    model.Image.CopyTo(stream);
                }

                product.Image = fileName;
            }
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return Ok(new {
                FileName = fileName,
                Code = code,
                Id = product.Id
            } );
        }

        [HttpPost]
        [Route("edit")]
        public async Task<IActionResult> EditProduct([FromForm] ProductEditViewModel model)
        {
            var product = _context.Products.FirstOrDefault(x => x.Code == model.Code);
            if (product == null) 
            {
                return BadRequest();
            }
            product.Name = model.Name;
            product.Description = model.Description;
            product.Price = model.Price;
            string fileName = "";
            if (model.Image != null)
            {
             fileName = Path.GetRandomFileName() + Path.GetExtension(model.Image.FileName);
                string dirName = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), "Images");
                string fullPath = Path.Combine(dirName, fileName);

                using (var stream = System.IO.File.Create(fullPath))
                {
                    model.Image.CopyTo(stream);
                }

                product.Image = fileName;
            }
           
            await _context.SaveChangesAsync();
            return Ok(new
            {
                FileName = fileName
            }
                ) ;
        }

        [HttpPost]
        [Route("delete")]
        public async Task<IActionResult> DeleteProduct([FromBody] string Code)
        {
            var product = _context.Products.FirstOrDefault(x => x.Code == Code);
            var entities = _context.CartProducts.Where(x => x.ProductId == product.Id);
            _context.CartProducts.RemoveRange(entities);
            await _context.SaveChangesAsync();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
