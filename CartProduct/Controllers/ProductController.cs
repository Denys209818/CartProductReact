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
            return await Task.Run(() =>
            {
                return Ok(new
                {
                    Products = _context.Products.ToList()
                });
            });
        }

        [HttpPost]
        [Route("getcart")]
        public async Task<IActionResult> GetCart([FromBody] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var cart = _context.Carts
                .FirstOrDefault(x => x.UserId == user.Id);
            var products = _context.CartProducts.Include(x => x.Product).Where(x => x.CartId == cart.Id)
                .Select(x =>new { 
                    product=x.Product, 
                    count=x.counter }).ToList();
            
                return Ok(new
                {
                    Products = products
                });
        }

        [HttpPost]
        [Route("getitem")]
        public async Task<IActionResult> GetProductItem([FromBody] ProductAddToCartViewModel productCart)
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


    }
}
