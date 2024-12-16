using cabandos.Server.Data;
using MediatR;

namespace cabandos.Server.Features.Mediator.Tasks;

public class GetTasksByStatusHandler : IRequestHandler<GetTasksByStatusQuery, List<object>>
{
    private ApplicationContext _context;

    public GetTasksByStatusHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<List<object>> Handle(GetTasksByStatusQuery request, CancellationToken cancellationToken)
    {
        var allStatuses = Enum.GetValues(typeof(Models.TaskStatus)).Cast<Models.TaskStatus>();

        var groupedTasks = allStatuses
            .Select(status => new
            {
                Status = status,
                Tasks = _context.Tasks.Where(t => t.Status == status).ToList()
            })
            .OrderBy(group => group.Status)
            .ToList<object>();

        return groupedTasks;
    }
}

public class GetTasksByStatusQuery : IRequest<List<object>>
{
}