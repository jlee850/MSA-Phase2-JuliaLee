using Back_End.Models;

namespace Back_End.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(User user);
        Task<User> CreateUser(User user);
    }
}