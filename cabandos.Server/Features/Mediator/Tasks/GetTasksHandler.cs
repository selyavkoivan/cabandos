using cabandos.Server.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace cabandos.Server.Features.Mediator.Tasks;

public class GetTasksHandler : IRequestHandler<GetTasksQuery, List<Models.Task>>
{
    private ApplicationContext _context;

    public GetTasksHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<List<Models.Task>> Handle(GetTasksQuery request, CancellationToken cancellationToken)
    {
        return await _context.Tasks.ToListAsync();
    }
}

public class GetTasksQuery : IRequest<List<Models.Task>>
{
}