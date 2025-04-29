// Data/ApplicationDbContext.cs
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AccessTransmitAPI.Models;

namespace AccessTransmitAPI.Data
{
    public class ApplicationDbContext : DbContext

    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        
        // Ajoutez ici d'autres DbSet pour vos modèles
        public DbSet<User> Users { get; set; }

    }
}