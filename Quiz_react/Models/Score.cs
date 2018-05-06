using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quiz_react.Models
{
    public class Score
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public int Points { get; set; }
        public DateTime DateTime { get; set; }
    }
}
