using Back_End.Contexts;
using Back_End.Models;
using Back_End.Services;

namespace Back_End.Services
{
    public class UserService : IUserService
    {
        private UserContext _userContext;

        public UserService(UserContext context)
        {
            _userContext = context;
        }

        public async Task<User> Authenticate(User u)
        {
            var user = await Task.Run(() => _userContext.Users.SingleOrDefault(user => user.Username == u.Username && user.Password == u.Password));

            // Return null if user not found
            if (user == null)
                return null;

            return user;
        }

        public async Task<User> CreateUser(User user)
        {
            _userContext.Users.Add(user);
            await _userContext.SaveChangesAsync();
            return user;
        }
    }
}