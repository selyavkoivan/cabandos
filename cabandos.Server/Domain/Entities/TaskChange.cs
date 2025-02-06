using CloudinaryDotNet.Core;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace cabandos.Server.Domain.Entities;

public class TaskChange: System.ICloneable
{
    public Guid Id { get; set; }


    public DateTime ChangedAt { get; set; }

    public string ChangeType { get; set; }
    public string? NewValue { get; set; }


    public Guid TaskId { get; set; }

    [JsonIgnore]
    public Task? Task{ get; set; }


    public string? UserId { get; set; }

    public User? User { get; set; }

    public Guid? PreviousChangeId { get; set; }

    [ForeignKey("PreviousChangeId")]
    public TaskChange? PreviousChange { get; set; }

    public TaskChange() { }

    public TaskChange(Guid taskId, string changeType, DateTime changedAt, string? changedByUserId = null,
          string? newValue = null, Guid? previousChangeId = null)
    {
        TaskId = taskId;
        UserId = changedByUserId;
        ChangeType = changeType;
        NewValue = newValue;
        ChangedAt = changedAt;
        PreviousChangeId = previousChangeId;
    }

    public object Clone()
    {
        var clone = this.MemberwiseClone() as TaskChange;
        
        this.User?.Tasks?.Clear();

        clone.User = this.User?.Clone() as User;
        clone.PreviousChange = this.PreviousChange?.Clone() as TaskChange;

        return clone;
    }
}