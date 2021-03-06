using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CartProduct.Data.Entities.Identity
{
    public class AppUser : IdentityUser<long>
    {
        public string Firstname { get; set; }
        public string Secondname { get; set; }
        public string Phone { get; set; }
        public string Image { get; set; }
        public virtual ICollection<AppUserRole> UserRoles { get; set; }
        public virtual Cart Cart { get; set; }
    }
}
