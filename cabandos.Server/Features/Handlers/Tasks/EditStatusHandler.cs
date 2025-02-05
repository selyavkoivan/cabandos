using MediatR;
using cabandos.Server.Data;
using cabandos.Server.Domain.Entities;

using Task = System.Threading.Tasks.Task;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using cabandos.Server.Features.Handlers.Users;

namespace cabandos.Server.Features.Handlers.Tasks;

public class EditStatusHandler : IRequestHandler<EditStatusCommand>
{
    private ApplicationContext _context;
    private IMediator _mediator;

    public EditStatusHandler(ApplicationContext context, IMediator mediator)
    {
        _context = context;
        _mediator = mediator;
    }

    public async Task Handle(EditStatusCommand request, CancellationToken cancellationToken)
    {
        var task = await _context.Tasks.FindAsync(request.TaskId);
        if (task == null)
        {
            throw new Exception("Task not found.");
        }
        task.Status = request.TaskStatus;

        await _context.SaveChangesAsync(cancellationToken);
    }
}


public class EditStatusCommand : IRequest
{
    public Guid TaskId { get; set; }
    public Domain.Entities.TaskStatus TaskStatus { get; set; }
    public ClaimsPrincipal? User { get; set; } 

    public EditStatusCommand(Guid taskId, Domain.Entities.TaskStatus taskStatus, ClaimsPrincipal? user)
    {
        TaskId = taskId;
        TaskStatus = taskStatus;
        User = user;
    }
}
