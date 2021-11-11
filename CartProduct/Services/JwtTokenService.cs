using CartProduct.Data.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CartProduct.Services
{
    public interface IJwtTokenService 
    {
        public string CreateToken(AppUser user);
    }
    public class JwtTokenService : IJwtTokenService
    {
        private UserManager<AppUser> _userManager { get; set; }
        private IConfiguration _configuration { get; set; }
        public JwtTokenService(UserManager<AppUser> userManager, 
            IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }
        public string CreateToken(AppUser user)
        {
            List<Claim> claims = new List<Claim> { 
                new Claim("name", user.Firstname),
                new Claim("email", user.Email),
                new Claim("surname", user.Secondname),
                new Claim("phone", user.Phone)
            };

            var roles = _userManager.GetRolesAsync(user).Result;
            foreach (var role in roles)
            {
                claims.Add(new Claim("role", role));
            }

            var symmetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetValue<String>("PR_KEY")));
            var signInCredentials = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(signingCredentials: 
                signInCredentials, claims: claims, 
                expires: DateTime.Now.AddDays(100));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
