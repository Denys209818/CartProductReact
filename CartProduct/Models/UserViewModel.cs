using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Models
{
    public class UserCreateViewModel
    {
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Secondname { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public IFormFile Image { get; set; }
        public string ConfirmPassword { get; set; }
    }

    public class UserItemViewModel
    {
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Secondname { get; set; }
        public string Phone { get; set; }
        public string Image { get; set; }
    }

    public class UserLoginViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
