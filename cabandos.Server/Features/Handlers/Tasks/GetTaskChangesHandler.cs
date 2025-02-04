using cabandos.Server.Data;
using cabandos.Server.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace cabandos.Server.Features.Handlers.Tasks;

public class GetTaskChangesHandler : IRequestHandler<GetTaskChangesQuery, Domain.Entities.Task>
{
    private ApplicationContext _context;

    public GetTaskChangesHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Domain.Entities.Task> Handle(GetTaskChangesQuery request, CancellationToken cancellationToken)
    {
        var taskId = Guid.Parse(request.TaskId);

        var task = await _context.Tasks.FindAsync(taskId).AsTask();

        task.TaskChanges = await _context.TaskChanges
            .Include(tc => tc.User)
            .Include(tc => tc.PreviousChange)
                .ThenInclude(pc => pc.User)
            .Where(tc => tc.TaskId == taskId)
            .OrderByDescending(tc => tc.ChangedAt)
            .Select(tc => (TaskChange)tc.Clone())
            .ToListAsync(cancellationToken);

        return task;
    }
}

public class GetTaskChangesQuery : IRequest<Domain.Entities.Task>
{
    public string TaskId { get; set; }

    public GetTaskChangesQuery(string taskId)
    {
        TaskId = taskId;
    }
}