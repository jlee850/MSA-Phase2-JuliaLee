namespace Back_End.Models
{
	public class Recipe
	{
		public long? Id { get; set; }
		public string? Name { get; set; }
        public string? TypeOfCuisine { get; set; }
        public int? PrepTime { get; set; }
        public int? CookTime { get; set; }
        public int? AverageCost { get; set; }
        public int? NumberOfMeals { get; set; }
        public string? Ingredients { get; set; }
        public string? Method { get; set; }
        public string? NutritionalInformation { get; set; }
    }
}

