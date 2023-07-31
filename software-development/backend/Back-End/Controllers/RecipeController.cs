using System;
using Back_End.Models;
using Back_End.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace Back_End.Controllers

{
    [ApiController]
    [Route("api/Recipe")]
    [Authorize(AuthenticationSchemes = "BasicAuthentication")]
    public class RecipeController : ControllerBase
    {
        private readonly RecipeService _service;

        public RecipeController(RecipeService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Recipes>> GetRecipe(long id)
        {
            var recipeName = await _service.GetRecipe(id);

            if (recipeName == null)
            {
                return NotFound();
            }

            return recipeName;
        }

        [HttpPost]
        public async Task<ActionResult<Recipes>> CreateRecipe(Recipes recipe)
        {
            var newRecipe = await _service.CreateRecipe(recipe);

            return CreatedAtAction(nameof(CreateRecipe), new { id= newRecipe.Id, nameofRecipe = newRecipe.NameOfRecipe
                }, newRecipe);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecipe(long id, Recipes recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest();
            }

            await _service.UpdateRecipe(recipe);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(long id)
        {
            await _service.DeleteRecipe(id);
            return NoContent();
        }
    }
}

