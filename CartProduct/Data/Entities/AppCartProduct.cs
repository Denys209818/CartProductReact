using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Data.Entities
{
    [Table("tblCartProducts")]
    public class AppCartProduct
    {
        public virtual Cart Cart { get; set; }
        public virtual Product Product { get; set; }
        public long CartId { get; set; }
        public long ProductId { get; set; }
        public int counter { get; set; }
    }
}
