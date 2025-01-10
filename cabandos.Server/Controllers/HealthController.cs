using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace cabandos.Server.Controllers;

[ApiController]
[Route("/api/health")]
public class HealthController : ControllerBase
{

    private readonly IMediator _mediator;
    
    public HealthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public IActionResult GetHealth()
    {
        return Ok();
    }
}