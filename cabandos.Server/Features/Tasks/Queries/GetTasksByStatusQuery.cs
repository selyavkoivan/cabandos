using MediatR;

namespace cabandos.Server.Features.Tasks.Queries;

public class GetTasksByStatusQuery : IRequest<List<object>>
{
}