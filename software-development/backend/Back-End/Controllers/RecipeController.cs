using Back_End.Models;
using Back_End.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace Back_End.Controllers

{
    [ApiController]
    [Route("api/Recipe")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class RecipeController : ControllerBase
    {
        private readonly RecipeService _service;

        public RecipeController(RecipeService service)
        {
            _service = service;
        }

        [HttpGet("{ingredients}")]
        public async Task<ActionResult<string>> GetRecipe(string ingredients)
        {
            var recipeName = await _service.GetRecipe(ingredients);

            if (recipeName == null)
            {
                return NotFound();
            }

            return recipeName;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetAllRecipe()
        {
            return await _service.GetAllRecipes();
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateRecipe(Recipe recipe)
        {
            var newRecipe = await _service.CreateRecipe(recipe);

            return CreatedAtAction(nameof(CreateRecipe), newRecipe);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecipe(long id, Recipe recipe)
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

