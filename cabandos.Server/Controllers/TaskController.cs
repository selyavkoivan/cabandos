using Microsoft.AspNetCore.Mvc;
using Task = cabandos.Server.Domain.Entities.Task;
using MediatR;
using cabandos.Server.Domain.DTO;
using cabandos.Server.Features.Handlers.Tasks;
using Microsoft.AspNetCore.Authorization;

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

    [Authorize]
    [HttpPost("AddTask")]
    public async Task<IActionResult> AddTask([FromBody] TaskDTO taskDTO)
    {
        var result = await _mediator.Send(new AddTaskCommand(taskDTO, User));
        return Ok(result);
    }

    [Authorize]
    [HttpPost("DeleteTask")]
    public async Task<IActionResult> DeleteTask([FromBody] Task task)
    {
        await _mediator.Send(new DeleteTaskCommand(task.Id));
        return NoContent();
    }

    [Authorize]
    [HttpPost("EditTaskStatus")]
    public async Task<IActionResult> EditTaskStatus([FromBody] Task task)
    {
        await _mediator.Send(new EditStatusCommand(task.Id, task.Status, HttpContext.User));
        return NoContent();
    }

    [Authorize]
    [HttpPost("EditTask")]
    public async Task<IActionResult> EditTask([FromBody] Task task)
    {
        await _mediator.Send(new EditTaskCommand(task));
        return NoContent();
    }

    [HttpGet("GetTaskChanges/{taskId}")]
    public async Task<IActionResult> EditTaskStatus(string taskId)
    {
        var result = await _mediator.Send(new GetTaskChangesQuery(taskId));
        return Ok(result);
    }
}

