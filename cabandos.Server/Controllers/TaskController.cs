using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using System;
using System.Collections;
using Task = cabandos.Server.Models.Task;
using TaskStatus = cabandos.Server.Models.TaskStatus;
using MediatR;
using cabandos.Server.Features.Tasks.Commands;
using cabandos.Server.Features.Tasks.Queries;
using cabandos.Server.Models.DTO;

namespace cabandos.Server.Controllers;

[ApiController]
[Route("/api/task")]
public class TaskController : ControllerBase
{

    private readonly IMediator _mediator;
    
    public TaskController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("GetTasks")]
    public async Task<IActionResult> GetTasks()
    {
        var result = await _mediator.Send(new GetTasksQuery());
        return Ok(result);
    }

    [HttpGet("GetTasksByStatus")]
    public async Task<IActionResult> GetTasksByStatus()
    {
        var result = await _mediator.Send(new GetTasksByStatusQuery());
        return Ok(result);
    }

    [HttpPost("AddTask")]
    public async Task<IActionResult> AddTask([FromBody] TaskDTO taskDTO)
    {
        var result = await _mediator.Send(new AddTaskCommand(taskDTO));
        return Ok(result);
    }

    [HttpPost("DeleteTask")]
    public async Task<IActionResult> DeleteTask([FromBody] Task task)
    {
        await _mediator.Send(new DeleteTaskCommand(task.Id));
        return NoContent();
    }

    [HttpPost("EditTaskStatus")]
    public async Task<IActionResult> EditTaskStatus([FromBody] Task task)
    {
        await _mediator.Send(new EditStatusCommand(task.Id, task.Status));
        return NoContent();
    }
}

