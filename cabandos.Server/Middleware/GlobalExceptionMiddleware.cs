using cabandos.Server.Features.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace cabandos.Server.Middleware;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch(AuthException ex)
        {
            var problemDetails = new ProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Authentication Error",
                Detail = ex.Message,
                Extensions = { ["error"] = ex.ErrorCode }
            };
            httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            httpContext.Response.ContentType = "application/json";
            await httpContext.Response.WriteAsJsonAsync(problemDetails);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception occurred.");

            httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
            httpContext.Response.ContentType = "application/json";

            await httpContext.Response.WriteAsJsonAsync(new { message = "Internal server error", error_description = ex.Message });
        }
    }
}
