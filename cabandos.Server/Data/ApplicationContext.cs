using cabandos.Server.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace cabandos.Server.Data;
public class ApplicationContext : IdentityDbContext<User>
{
    public override DbSet<User> Users => Set<User>();
    public DbSet<Domain.Entities.Task> Tasks => Set<Domain.Entities.Task>();

    public ApplicationContext(DbContextOptions<ApplicationContext> options)
           : base(options) => Database.EnsureCreated();
}