using AutoMapper;
using CartProduct.Data.Entities;
using CartProduct.Data.Entities.Identity;
using CartProduct.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Mappers
{
    public class MyAutoMapper : Profile
    {
        public MyAutoMapper()
        {
            CreateMap<UserCreateViewModel, AppUser>()
                .ForMember(x => x.Image, y => y.Ignore())
                .ForMember(x => x.UserName, y => y.MapFrom(z => z.Email));

            CreateMap<AppUser, UserItemViewModel>()
                .ForMember(x => x.Email, y => y.MapFrom(z => z.Email))
                .ForMember(x => x.Firstname, y => y.MapFrom(z => z.Firstname))
                .ForMember(x => x.Secondname, y => y.MapFrom(z => z.Secondname))
                .ForMember(x => x.Phone, y => y.MapFrom(z => z.Phone))
                .ForMember(x => x.Image, y => y.MapFrom(z => z.Image));

            CreateMap<Product, ProductReturnViewModel>();
        }
    }
}
