namespace cabandos.Server.Middleware;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        var request = httpContext.Request;
        _logger.LogInformation($"Request: {request.Method} {request.Path} at {DateTime.UtcNow}");

        await _next(httpContext);

        _logger.LogInformation($"Response: {httpContext.Response.StatusCode} at {DateTime.UtcNow}");
    }
}
