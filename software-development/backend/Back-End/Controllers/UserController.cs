using System;
using Azure.Core;
using System.Security.Policy;
using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Back_End.Models;
using Back_End.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Back_End.Controllers
{
    [ApiController]
    [Route("api/User")]
    public class UserController : Controller
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            var newUser = await _service.CreateUser(user);

            return CreatedAtAction(nameof(CreateUser), new
            {
                id = newUser.Id,
            }, newUser);
        }

        [Route("login")]
        [HttpPost]
        public async Task<ActionResult<User>> Login(User user)
        {
            var newUser = await _service.Authenticate(user);

            if (newUser is null)
            {
                return Unauthorized();
            }

            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

            var issuer = builder["Jwt:Issuer"];
            var audience = builder["Jwt:Audience"];
            var key = Encoding.ASCII.GetBytes(builder["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim("Id", Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti,
                Guid.NewGuid().ToString())
             }),
                Expires = DateTime.UtcNow.AddMinutes(10),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials
                (new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var stringToken = tokenHandler.WriteToken(token);

            dynamic response = new { bearer = stringToken };
            return Ok(response);
        }
    }
}



