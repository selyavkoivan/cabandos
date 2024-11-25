using MediatR;

namespace cabandos.Server.Features.Tasks.Queries;

public class GetTasksQuery : IRequest<List<Models.Task>>
{
}