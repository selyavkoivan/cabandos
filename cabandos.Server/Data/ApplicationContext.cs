using cabandos.Server.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Task = cabandos.Server.Domain.Entities.Task;


namespace cabandos.Server.Data;
public class ApplicationContext : IdentityDbContext<User>
{
    public override DbSet<User> Users => Set<User>();
    public DbSet<Task> Tasks => Set<Task>();
    public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();

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

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.AvatarUrl)
                  .HasDefaultValue("https://res.cloudinary.com/fanfictionteamoff/image/upload/v1669894168/ekrama/%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_2022-12-01_142927792_vx67r0.png");
        });
    }
}