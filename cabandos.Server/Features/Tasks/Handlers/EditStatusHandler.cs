using MediatR;
using cabandos.Server.Data;
using cabandos.Server.Features.Tasks.Commands;
using Task = System.Threading.Tasks.Task;
using Microsoft.EntityFrameworkCore;

namespace cabandos.Server.Features.Tasks.Handlers;

public class EditStatusHandler : IRequestHandler<EditStatusCommand>
{
    private ApplicationContext _context;

    public EditStatusHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task Handle(EditStatusCommand request, CancellationToken cancellationToken)
    {
        var task = _context.Tasks.Find(request.TaskId);

        task.Status = request.TaskStatus;

        await _context.SaveChangesAsync(cancellationToken);

        return;
    }
}