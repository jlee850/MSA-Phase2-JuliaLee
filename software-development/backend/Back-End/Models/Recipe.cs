namespace Back_End.Models
{
	public class Recipe
	{
		public required long Id { get; set; }
		public required string NameOfRecipe { get; set; }
        public required string TypeOfCuisine { get; set; }
        public required int PrepTime { get; set; }
        public required int CookTime { get; set; }
        public required int AverageCost { get; set; }
        public required int NumberOfMeals { get; set; }
        public required string Ingredients { get; set; }
        public required string Method { get; set; }
        public required string NutritionalInformation { get; set; }
    }
}

