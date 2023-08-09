using System;
using Back_End.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_End.Contexts
{
    public class RecipeContext : DbContext
    {
        public RecipeContext(DbContextOptions<RecipeContext> options) : base(options)
        {
        }
        public DbSet<Recipe> Recipes { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Recipe>();        
        }
    }
}

