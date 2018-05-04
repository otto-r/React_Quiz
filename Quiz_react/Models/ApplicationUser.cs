using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz_react.Models
{
    public class ApplicationUser : IdentityUser
    {
        public virtual List<Score> Scores{ get; set; }
    }
}
