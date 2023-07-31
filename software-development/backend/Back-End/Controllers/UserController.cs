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

namespace Back_End.Controllers
{
    [ApiController]
    [Route("api/User")]
    public class UserController : Controller
    {
        private readonly UserService _service;

        public UserController(UserService service)
        {
            _service = service;
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<User>> GetUser(long id)
        //{
        //    var user = await _service.GetUser(id);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return user;
        //}

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            var newUser = await _service.CreateUser(user);

            return CreatedAtAction(nameof(CreateUser), new
            {
                id = newUser.Id,
            }, newUser);
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateUser(long id, User user)
        //{
        //    if (id != user.Id)
        //    {
        //        return BadRequest();
        //    }

        //    await _service.UpdateUser(user);

        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteUser(long id)
        //{
        //    await _service.DeleteUser(id);
        //    return NoContent();
        //}
    }
}



