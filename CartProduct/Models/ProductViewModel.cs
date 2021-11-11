﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Models
{
    public class ProductAddToCartViewModel
    {
        public int ProductId { get; set; }
        public string UserEmail { get; set; }
    }

    public class ProductReturnViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }
        public int Quantity { get; set; }
        public string InventoryStatus { get; set; }
        public int Rating { get; set; }
    }

    public class ProductItemViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }
        public int Quantity { get; set; }
        public string InventoryStatus { get; set; }
        public int Rating { get; set; }
    }
}
