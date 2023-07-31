using Microsoft.AspNetCore.Identity;

namespace Back_End.Models
{
    public class User
    {
        public string Id { get; set; }
        public required string Username { get; set; }
        public string? EmailAddress { get; set; }
        public required string Password { get; set; }
        public required DateTime TimeCreated { get; set; }
    }    
}
