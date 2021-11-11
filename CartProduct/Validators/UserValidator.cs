using CartProduct.Data.Entities.Identity;
using CartProduct.Models;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Validators
{
    public class UserValidator : AbstractValidator<UserCreateViewModel>
    {
        private UserManager<AppUser> _userManager { get; set; }
        public UserValidator(UserManager<AppUser> userManager)
        {
            _userManager = userManager;

            RuleFor(x => x.Email).NotEmpty().WithMessage("Поле не може бути пустим!")
                .DependentRules(() =>
                {
                    RuleFor(x => x.Email).EmailAddress().WithMessage("Електронна адреса не коректна!")
                    .Must(IsUnique).WithMessage("Аккаунт уже існує!");
                });
            RuleFor(x => x.Firstname).NotEmpty().WithMessage("Поле не може бути пустим!");
            RuleFor(x => x.Secondname).NotEmpty().WithMessage("Поле не може бути пустим!");
            RuleFor(x => x.Phone).NotEmpty().WithMessage("Поле не може бути пустим!");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Поле не може бути пустим!")
                .MinimumLength(6).WithMessage("Найменша кількість символів - 6");
            RuleFor(x => x.ConfirmPassword).Equal(x => x.Password).WithMessage("Поля не співпадають!");
                
        }

        public bool IsUnique(string Email) 
        {
            return _userManager.FindByNameAsync(Email).Result == null;
        }
    }
}
