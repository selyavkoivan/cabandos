using cabandos.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace cabandos.Server.Data;
public class ApplicationContext : IdentityDbContext<User>
{
    public override DbSet<User> Users => Set<User>();
    public DbSet<Models.Task> Tasks => Set<Models.Task>();

    public ApplicationContext(DbContextOptions<ApplicationContext> options)
           : base(options) => Database.EnsureCreated();
}