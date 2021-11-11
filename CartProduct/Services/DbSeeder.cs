using CartProduct.Constants;
using CartProduct.Data;
using CartProduct.Data.Entities;
using CartProduct.Data.Entities.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Services
{
    public static class DbSeeder
    {
        public static void SeedAll(this IApplicationBuilder app) 
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                .CreateScope()) 
            {
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();
                if (!roleManager.Roles.Any()) 
                {
                    roleManager.CreateAsync(new AppRole { 
                        Name = Roles.User
                    }).Wait();
                    
                    roleManager.CreateAsync(new AppRole { 
                        Name = Roles.Admin
                    }).Wait();
                }

                if (!context.Products.Any()) 
                {
                    context.Products.AddRange(new List<Product> { 
                        new Product 
                        {
                            Name = "Mercedes",
                            Category = "Cars",
                            Code=Guid.NewGuid().ToString(),
                            Image ="1.jpg",
                            Description = "Mercedes Benz",
                            InventoryStatus = "OUTSTOCK",
                            Price = 10000000,
                            Quantity = 60,
                            Rating = 8
                        },
                        new Product
                        {
                            Name = "MAN",
                            Category = "Trucks",
                            Code=Guid.NewGuid().ToString(),
                            Image ="2.jpg",
                            Description = "MAN Truck",
                            InventoryStatus = "OUTSTOCK",
                            Price = 100000000,
                            Quantity = 20,
                            Rating = 6
                        }
                    });
                    context.SaveChanges();
                }
            }
        }
    }
}
