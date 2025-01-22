using cabandos.Server.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace cabandos.Server.Features.Handlers.Tasks;

public class GetTasksByStatusHandler : IRequestHandler<GetTasksByStatusQuery, List<object>>
{
    private ApplicationContext _context;

    public GetTasksByStatusHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<List<object>> Handle(GetTasksByStatusQuery request, CancellationToken cancellationToken)
    {
        var allStatuses = Enum.GetValues(typeof(Domain.Entities.TaskStatus)).Cast<Domain.Entities.TaskStatus>();
        var groupedStatuses = allStatuses.GroupBy(status => status == 0 ? 0 : ((int)status - 1) / 10 + 1)
            .ToDictionary(
                group => group.Key,
                group => group.ToArray()
            );
        var tasks = _context.Tasks.Include(t => t.User).ToList();

        var groupedTasks = groupedStatuses.Select(statusGroup => new
        {
            Status = statusGroup.Key,
            IsLeaf = false,
            Tasks = statusGroup.Value.Select(status => new
            {
                Status = (int)status,
                Tasks = tasks.Where(t => t.Status == status).ToList(),
                IsLeaf = true
            }).OrderBy(group => group.Status)
            .ToList()
        }).OrderBy(group => group.Status)
            .ToList<object>();

        return groupedTasks;
    }
}

public class GetTasksByStatusQuery : IRequest<List<object>>
{
}