using Microsoft.EntityFrameworkCore;
using PDF_CRUD.Model;
namespace PDF_CRUD.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
