using cabandos.Server.Domain.DTO;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace cabandos.Server.Domain.Entities;
public class Task
{
    public Task() { }

    public Task(TaskDTO taskDTO)
    {
        Name = taskDTO.Name;
        Description = taskDTO.Description;
        Status = taskDTO.Status;
    }

    public Guid Id { get; set; }

    [StringLength(30, ErrorMessage = "Task name cannot exceed 30 characters.")]
    public string Name { get; set; }

    [StringLength(100, ErrorMessage = "Task description cannot exceed 100 characters.")]
    public string? Description { get; set; }
    public TaskStatus Status { get; set; }

    public string? UserId { get; set; }

    [JsonIgnore]
    public User? User { get; set; }


    public List<TaskChange>? TaskChanges { get; set; } = [];
}