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
        var changeType = "StatusChange";

        var previousChange = await _context.TaskChanges
        .Where(tc => tc.TaskId == task.Id && tc.ChangeType == changeType)
        .OrderByDescending(tc => tc.ChangedAt)
        .FirstOrDefaultAsync(cancellationToken);

        var me = await _mediator.Send(new GetMeQuery(request.User)) as User;

        var taskChange = new TaskChange(
            taskId: task.Id,
            changeType: changeType,
            changedAt: DateTime.UtcNow,
            changedByUserId: me?.Id,
            newValue: task.Status.ToString(),
            previousChangeId: previousChange?.Id
        );

        _context.TaskChanges.Add(taskChange);

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
