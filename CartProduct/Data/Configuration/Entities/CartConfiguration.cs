using CartProduct.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Data.Configuration.Entities
{
    public class CartConfiguration : IEntityTypeConfiguration<AppCartProduct>
    {
        public void Configure(EntityTypeBuilder<AppCartProduct> builder)
        {
            builder.HasKey(keys => new { keys.CartId, keys.ProductId });

            builder.HasOne(virtualElementFromAppCartProduct => virtualElementFromAppCartProduct.Cart)
                .WithMany(virtualCollectionFromCart => virtualCollectionFromCart.CartProducts)
                .HasForeignKey(intElementFromAppCartProduct => intElementFromAppCartProduct.CartId)
                .IsRequired();

            builder.HasOne(virtualElementFromAppCartProduct => virtualElementFromAppCartProduct.Product)
                .WithMany(virtualCollectionFromProduct => virtualCollectionFromProduct.CartProducts)
                .HasForeignKey(intElementFromAppCartProduct => intElementFromAppCartProduct.ProductId)
                .IsRequired();
        }
    }
}
