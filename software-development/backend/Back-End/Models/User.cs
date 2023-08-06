using Microsoft.AspNetCore.Identity;

namespace Back_End.Models
{
    public class User
    {
        public string? Id { get; set; }
        public string? Username { get; set; }
        public string? EmailAddress { get; set; }
        public string? Password { get; set; }
        public DateTime? TimeCreated { get; set; }

        public User(string username, string password)
        {
            this.Username = username;
            this.Password = password;
        }
    }
}
