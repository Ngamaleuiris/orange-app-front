using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using AccessTransmitAPI.Configuration;
using AccessTransmitAPI.Services;
using OfficeOpenXml;
using AccessTransmitAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Définir la licence EPPlus AVANT tout usage (Compatible avec EPPlus 5)
ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Keycloak
builder.Services.Configure<KeycloakOptions>(builder.Configuration.GetSection("Keycloak"));
builder.Services.AddHttpClient<KeycloakService>();
builder.Services.AddScoped<KeycloakService>();

// Configure Excel
builder.Services.AddScoped<ExcelDynamicImportService>();
builder.Services.AddScoped<ExcelUserImportService>();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 30))));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

var app = builder.Build();

// Swagger + dev exception page
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Urls.Add("http://localhost:5254");

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();
