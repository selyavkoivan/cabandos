using cabandos.Server.Domain.Entities;
using cabandos.Server.Features.Services;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using Task = cabandos.Server.Domain.Entities.Task;


namespace cabandos.Server.Data;
public class ApplicationContext : IdentityDbContext<User>
{
    private readonly IUserService _userService;


    public override DbSet<User> Users => Set<User>();
    public DbSet<Task> Tasks => Set<Task>();
    public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();
    public DbSet<TaskChange> TaskChanges => Set<TaskChange>();

    public ApplicationContext(DbContextOptions<ApplicationContext> options, IUserService userService)
     : base(options)
    {
        _userService = userService;
    }

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

    public override int SaveChanges()
    {
        this.ApplyTaskTriggers();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
    {
        this.ApplyTaskTriggers();
        return base.SaveChangesAsync();
    }

    private void ApplyTaskTriggers()
    {
        var entries = ChangeTracker.Entries<Task>()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified)
            .ToList();

        foreach (var entry in entries)
        {
            var task = entry.Entity;
            var changedAt = DateTime.UtcNow;

            if (entry.State == EntityState.Modified)
            { 
                foreach (var property in entry.OriginalValues.Properties)
                {
                    var oldValue = entry.OriginalValues[property];
                    var newValue = entry.CurrentValues[property];

                    if (!object.Equals(oldValue, newValue))
                    {
                        var propertyName = property.Name;
                        var changeType = $"{propertyName} Change";

                        var previousChange = TaskChanges
                            .Where(tc => tc.TaskId == task.Id && tc.ChangeType == changeType)
                            .OrderByDescending(tc => tc.ChangedAt)
                            .FirstOrDefault();

                        var previousChangeId = previousChange?.Id;

                        var taskChange = new TaskChange
                        {
                            Id = Guid.NewGuid(),
                            TaskId = task.Id,
                            ChangeType = changeType,
                            PreviousChangeId = previousChangeId, 
                            NewValue = newValue?.ToString(), 
                            ChangedAt = changedAt,
                            UserId = _userService.GetCurrentUserId()
                        };

                        TaskChanges.Add(taskChange); 
                    }
                }
            }
        }
    }
}