using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Data.Entities
{
    [Table("tblProducts")]
    public class Product
    {
        [Key]
        public long Id { get; set; }
        [Required, StringLength(255)]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required, StringLength(500)]
        public string Description { get; set; }
        [Required, StringLength(255)]
        public string Code { get; set; }
        [StringLength(255)]
        public string Image { get; set; }
        [Required, StringLength(255)]
        public string Category { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required, StringLength(255)]
        public string InventoryStatus { get; set; }
        [Required, Range(0,10)]
        public int Rating { get; set; }

        public virtual List<AppCartProduct> CartProducts { get; set; }
    }
}
