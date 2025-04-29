using AccessTransmitAPI.Configuration;
using AccessTransmitAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Keycloak before building the application
builder.Services.Configure<KeycloakOptions>(builder.Configuration.GetSection("Keycloak"));
builder.Services.AddHttpClient<KeycloakService>();
builder.Services.AddScoped<KeycloakService, KeycloakService>();

// Configuration CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

// Build the application after all services are configured
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configuration du port
app.Urls.Add("http://localhost:5254");

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors("AllowReactApp");
app.MapControllers();

app.Run();
