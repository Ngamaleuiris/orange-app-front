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

        // <--- CONSTRUCTEUR PAR DÉFAUT POUR EF DESIGN-TIME
        public ApplicationDbContext() { }

        // Ajoutez ici d'autres DbSet pour vos modèles
        public DbSet<User> Users { get; set; }
        public DbSet<UserNCE> UserNCE { get; set; }
        public DbSet<UserNFMP> UserNFMP { get; set; }
        public DbSet<UserIMONITOR> UserIMONITOR { get; set; }
        public DbSet<UserNOMAD> UserNOMAD { get; set; }

        // Correction pour éviter l'erreur "clé trop longue"
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.Id)
                .HasMaxLength(128); // ou 36 si c’est un GUID

            base.OnModelCreating(modelBuilder);
        }
    }
}
