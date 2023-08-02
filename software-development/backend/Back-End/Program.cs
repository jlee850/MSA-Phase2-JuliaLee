using Back_End.Contexts;
using Back_End.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NSwag;
using NSwag.Generation.Processors.Security;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//// Retrieve the configuration from appsettings.json
var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json")
    .Build();

var connectionString = configuration.GetConnectionString("DatabaseConnection");

builder.Services.AddDbContext<UserContext>(opt =>
    opt.UseSqlServer(connectionString));

//builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
//    .AddUserStore<UserContext>();

builder.Services.AddDbContext<RecipeContext>(opt =>
    opt.UseSqlServer(connectionString)
);
       
builder.Services.AddScoped<RecipeService>();

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddAuthentication("BasicAuthentication")
    .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);

builder.Services.AddAuthorization();

// register the required Swagger services for NSwag
builder.Services.AddOpenApiDocument(document => 
{
    document.Title = "My Todo Api";
    document.Version = "v1";
    document.AddSecurity("Basic", Enumerable.Empty<string>(), new OpenApiSecurityScheme
    {
        Type = OpenApiSecuritySchemeType.Basic,
        Name = "Authorization",
        In = OpenApiSecurityApiKeyLocation.Header,
        Description = "Access token",
    });

    document.OperationProcessors.Add(
        new AspNetCoreOperationSecurityScopeProcessor("Basic")
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Register the Swagger generator and the Swagger UI middlewares
    app.UseOpenApi();
    app.UseSwaggerUi3();    
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(policy =>
{
    policy.WithOrigins("http://localhost:3000")
        .AllowCredentials()
        .AllowAnyHeader()
        .AllowAnyMethod();
});

app.MapControllers();

app.Run();
