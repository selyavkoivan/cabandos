using cabandos.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using System;
using System.Collections;

using cabandos.Server.Models.DTO;
using Task = cabandos.Server.Models.Task;
using TaskStatus = cabandos.Server.Models.TaskStatus;

namespace cabandos.Server.Controllers;

[ApiController]
[Route("/api/task")]
public class TaskController : ControllerBase
{

    private readonly ILogger<TaskController> _logger;

    private static List<Task> _tasks { get; set; } = [];

    public TaskController(ILogger<TaskController> logger)
    {
        _logger = logger;
    }

    [HttpGet("GetTasks")]
    public List<Task> GetTasks() => _tasks;

    [HttpGet("GetTasksByStatus")]
    public List<object> GetTasksByStatus()
    {
        var allStatuses = Enum.GetValues(typeof(TaskStatus)).Cast<TaskStatus>();

        var groupedTasks = allStatuses
            .Select(status => new
            {
                Status = status,
                Tasks = _tasks.Where(t => t.Status == status).ToList()
            })
            .OrderBy(group => group.Status)
            .ToList<object>();

        return groupedTasks;
    }


    [HttpPost("AddTask")]
    public Task AddTask([FromBody] TaskDTO taskDTO)
    {
        var task = new Task(taskDTO);
        _tasks.Add(task);

        return task;
    }

    [HttpPost("DeleteTask")]
    public void DeleteTask([FromBody] Task task) 
    {
        _tasks.Remove(_tasks.First(t => t.Id == task.Id)); 
    }

    [HttpPost("EditTaskStatus")]
    public void EditTaskStatus([FromBody] Task task)
    {
        _tasks.First(t => t.Id == task.Id).Status = task.Status;
    }
}

