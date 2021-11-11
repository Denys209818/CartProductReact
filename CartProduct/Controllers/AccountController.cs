using AutoMapper;
using CartProduct.Constants;
using CartProduct.Data;
using CartProduct.Data.Entities;
using CartProduct.Data.Entities.Identity;
using CartProduct.Models;
using CartProduct.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtTokenService _tokenService;
        private readonly EFContext _context;
        public AccountController(IMapper mapper, UserManager<AppUser> userManager,
            IJwtTokenService tokenService, EFContext context)
        {
            _mapper = mapper;
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
        }
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateUser([FromForm] UserCreateViewModel createModel)
        {
            AppUser user = _mapper.Map<AppUser>(createModel);
            
            var result = await _userManager.CreateAsync(user, 
                createModel.Password);
            if (!result.Succeeded) 
            {
                return BadRequest(new { 
                    Invalid = result.Errors.ToList()
                });
            }

            if (createModel.Image != null) 
            {
                string fileName = Path.GetRandomFileName() +
                    Path.GetExtension(createModel.Image.FileName);
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), 
                    "Images", fileName);

                using (var stream = System.IO.File.Create(filePath)) 
                {
                    createModel.Image.CopyTo(stream);
                }

                user.Image = fileName;
            }

            var roleResult = _userManager.AddToRoleAsync(user, Roles.User)
                .Result;

            if (!roleResult.Succeeded) 
            {
                return BadRequest(new
                {
                    Invalid = result.Errors.ToList()
                });
            }

            Cart cart = new Cart();
            cart.User = user;
            _context.Carts.Add(cart);
            _context.SaveChanges();



            return Ok(new { 
                message="Успішно зареєстровано!",
                user = _mapper.Map<UserItemViewModel>(user),
                token = _tokenService.CreateToken(user)
            });
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginUser([FromBody] UserLoginViewModel loginModel) 
        {
            var user = await _userManager.FindByEmailAsync(loginModel.Email);

            if (user == null) 
            {
                return BadRequest(new
                {
                    Invalid = new List<object> {
                        new {
                            Code="UserNotRegister",
                            Description="Користувача не існує!"
                        }

                    }
                });
            }

            if (!(await _userManager.CheckPasswordAsync(user, loginModel.Password))) 
            {
                return BadRequest(new {
                    Invalid = new List<object> { 
                        new {
                            Code="PasswordNotTrue",
                            Description="Пароль не вірний!"
                        }

                    }
                });
            }
            string token = _tokenService.CreateToken(user);
            return Ok(new { 
                token = token,
                user = _mapper.Map<UserItemViewModel>(user),
                message="Вхід схвалено!"
            });
        }

    }
}
