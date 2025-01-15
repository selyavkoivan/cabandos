using cabandos.Server.Data;
using cabandos.Server.Domain.DTO;
using cabandos.Server.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace cabandos.Server.Features.Tasks.Handlers;
using Task = Domain.Entities.Task;

public class AddTaskHandler : IRequestHandler<AddTaskCommand, Task>
{
    private ApplicationContext _context;
    private readonly UserManager<User> _userManager;

    public AddTaskHandler(ApplicationContext context, UserManager<User> userManager)
    {
        this._context = context;
        this._userManager = userManager;
    }

    public async Task<Task> Handle(AddTaskCommand request, CancellationToken cancellationToken)
    {
        var task = new Task(request.TaskDTO);
        var user = await this._userManager.GetUserAsync(request.User);

        if(user != null)
        {
            task.User = user;
        }

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync(cancellationToken);

        return task;
    }
}

public class AddTaskCommand : IRequest<Task>
{
    public TaskDTO TaskDTO { get; }
    public ClaimsPrincipal User { get; }

    public AddTaskCommand(TaskDTO taskDTO, ClaimsPrincipal user)
    {
        this.TaskDTO = taskDTO;
        this.User = user;
    }
}