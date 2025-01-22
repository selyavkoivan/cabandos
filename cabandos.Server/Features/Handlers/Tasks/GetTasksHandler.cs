using cabandos.Server.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace cabandos.Server.Features.Handlers.Tasks;

public class GetTasksHandler : IRequestHandler<GetTasksQuery, List<Domain.Entities.Task>>
{
    private ApplicationContext _context;

    public GetTasksHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<List<Domain.Entities.Task>> Handle(GetTasksQuery request, CancellationToken cancellationToken)
    {
        return await _context.Tasks.ToListAsync();
    }
}

public class GetTasksQuery : IRequest<List<Domain.Entities.Task>>
{
}