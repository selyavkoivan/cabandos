using cabandos.Server.Domain.DTO;
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

    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public string? Description { get; set; }
    public TaskStatus Status { get; set; }

    public string? UserId { get; set; }

    [JsonIgnore]
    public User? User { get; set; }
}