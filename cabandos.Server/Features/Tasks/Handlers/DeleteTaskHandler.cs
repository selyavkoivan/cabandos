using cabandos.Server.Data;
using cabandos.Server.Features.Tasks.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Tasks.Handlers;
public class DeleteTaskHandler : IRequestHandler<DeleteTaskCommand>
{
    private ApplicationContext _context;

    public DeleteTaskHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task Handle(DeleteTaskCommand request, CancellationToken cancellationToken)
    {
        var task = _context.Tasks.Find(request.TaskId);

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync(cancellationToken);

        return;
    }
}

