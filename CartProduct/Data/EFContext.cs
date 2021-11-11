using CartProduct.Data.Configuration.Entities;
using CartProduct.Data.Entities;
using CartProduct.Data.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Data
{
    public class EFContext : IdentityDbContext<AppUser, AppRole, long, IdentityUserClaim<long>
        , AppUserRole, IdentityUserLogin<long>, IdentityRoleClaim<long>, IdentityUserToken<long>>
    {
        public EFContext(DbContextOptions opts) : base(opts)
        {

        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Cart> Carts { get; set; }
        public DbSet<AppCartProduct> CartProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region Identity
                builder.ApplyConfiguration(new IdentityConfiguration());
            #endregion
            
            #region Cart
                builder.ApplyConfiguration(new CartConfiguration());
            #endregion
        }
    }
}
