﻿using cabandos.Server.Models.DTO;

namespace cabandos.Server.Models;
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
}