using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using AccessTransmitAPI.Data;

namespace AccessTransmitAPI.Data
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseMySql(
                "server=localhost;database=AccessTransmitDb;user=root;password=", 
                new MySqlServerVersion(new Version(8, 0, 21))
            );

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
