using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back_End.Migrations.Recipe
{
    /// <inheritdoc />
    public partial class updateRecipes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeOfCuisine = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrepTime = table.Column<int>(type: "int", nullable: true),
                    CookTime = table.Column<int>(type: "int", nullable: true),
                    AverageCost = table.Column<int>(type: "int", nullable: true),
                    NumberOfMeals = table.Column<int>(type: "int", nullable: true),
                    Ingredients = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Method = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NutritionalInformation = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Recipes");
        }
    }
}
