using MediatR;
using cabandos.Server.Data;
using cabandos.Server.Domain.Entities;

using Task = System.Threading.Tasks.Task;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using cabandos.Server.Features.Handlers.Users;

namespace cabandos.Server.Features.Handlers.Tasks;

public class EditTaskHandler : IRequestHandler<EditTaskCommand>
{
    private ApplicationContext _context;
    private IMediator _mediator;

    public EditTaskHandler(ApplicationContext context, IMediator mediator)
    {
        _context = context;
        _mediator = mediator;
    }

    public async Task Handle(EditTaskCommand request, CancellationToken cancellationToken)
    {
        var task = await _context.Tasks.FindAsync(request.NewTask.Id);
        if (task == null)
        {
            throw new Exception("Task not found.");
        }

        task.Name = request.NewTask.Name;
        task.Description = request.NewTask.Description;

        await _context.SaveChangesAsync(cancellationToken);
    }
}


public class EditTaskCommand : IRequest
{
    public Domain.Entities.Task NewTask { get; set; }

    public EditTaskCommand(Domain.Entities.Task newTask)
    {
        NewTask = newTask;
    }
}
