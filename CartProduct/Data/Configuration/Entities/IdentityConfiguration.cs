using CartProduct.Data.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Data.Configuration.Entities
{
    public class IdentityConfiguration : IEntityTypeConfiguration<AppUserRole>
    {
        public void Configure(EntityTypeBuilder<AppUserRole> builder)
        {
            builder.HasKey(keys => new { keys.RoleId, keys.UserId });

            builder.HasOne(virtualElementFromAppUserRole => virtualElementFromAppUserRole.User)
                .WithMany(virtualElementFromAppUser => virtualElementFromAppUser.UserRoles)
                .HasForeignKey(intElementFromAppUserRole => intElementFromAppUserRole.UserId)
                .IsRequired();

            builder.HasOne(virtualElementFromAppUserRole => virtualElementFromAppUserRole.Role)
                .WithMany(virtualElementFromAppRole => virtualElementFromAppRole.UserRoles)
                .HasForeignKey(intElementFromAppUserRole => intElementFromAppUserRole.RoleId)
                .IsRequired();
        }
    }
}
