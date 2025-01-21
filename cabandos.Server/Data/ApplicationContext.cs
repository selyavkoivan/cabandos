using cabandos.Server.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Task = cabandos.Server.Domain.Entities.Task;


namespace cabandos.Server.Data;
public class ApplicationContext : IdentityDbContext<User>
{
    public override DbSet<User> Users => Set<User>();
    public DbSet<Task> Tasks => Set<Task>();

    public ApplicationContext(DbContextOptions<ApplicationContext> options)
           : base(options) => Database.EnsureCreated();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Task>()
            .HasOne(t => t.User)
            .WithMany(u => u.Tasks)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<User>()
        .HasIndex(u => u.Email)
        .IsUnique();
    }
}