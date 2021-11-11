using CartProduct.Data.Entities.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Data.Entities
{
    [Table("tblCarts")]
    public class Cart
    {
        [Key]
        public long Id { get; set; }
        [ForeignKey("User")]
        public long UserId { get; set; }
        public virtual AppUser User { get; set; }
        public virtual List<AppCartProduct> CartProducts { get; set; }
    }
}
