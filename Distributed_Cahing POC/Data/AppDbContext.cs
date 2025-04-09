using Microsoft.EntityFrameworkCore;


namespace Distributed_Cahing_POC.Data
{
    public class AppDbContext:DbContext
    {
        public DbSet<WeatherForecast> WeatherForecasts { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
