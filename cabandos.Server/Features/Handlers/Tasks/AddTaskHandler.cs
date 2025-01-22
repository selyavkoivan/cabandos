using cabandos.Server.Data;
using cabandos.Server.Domain.DTO;
using cabandos.Server.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace cabandos.Server.Features.Handlers.Tasks;
using Task = Domain.Entities.Task;

public class AddTaskHandler : IRequestHandler<AddTaskCommand, Task>
{
    private ApplicationContext _context;
    private readonly UserManager<User> _userManager;

    public AddTaskHandler(ApplicationContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task<Task> Handle(AddTaskCommand request, CancellationToken cancellationToken)
    {
        var task = new Task(request.TaskDTO);
        var user = await _userManager.GetUserAsync(request.User);

        if (user is not null)
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
        TaskDTO = taskDTO;
        User = user;
    }
}