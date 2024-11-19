using cabandos.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace cabandos.Server.Controllers;

[ApiController]
[Route("/api/weatherForecast")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries =
    [
        "Cold", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    ];

    private readonly ILogger<WeatherForecastController> _logger;

    private static IEnumerable<IEnumerable<WeatherForecast>> _weatherForecasts { get; set; }

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
        _weatherForecasts ??= GetWeatherForecastsGroup();
    }

    [HttpGet("GetWeatherForecast")]
    public IEnumerable<IEnumerable<WeatherForecast>> Get() => _weatherForecasts;

    [HttpGet("LoadNewData")]
    public IEnumerable<IEnumerable<WeatherForecast>> GetNewData()
    {
        _weatherForecasts = GetWeatherForecastsGroup();
        return _weatherForecasts;
    }

    [HttpPost("EditWeatherForecast")]
    public void Post([FromBody] IEnumerable<IEnumerable<WeatherForecast>> newWeatherForecastsGroup)
    {
        _weatherForecasts = newWeatherForecastsGroup;
        return;
    }

    private IEnumerable<IEnumerable<WeatherForecast>> GetWeatherForecastsGroup() =>
    [GetWeatherForecasts(), GetWeatherForecasts(), GetWeatherForecasts()];

    private IEnumerable<WeatherForecast> GetWeatherForecasts()
    {
        return Enumerable.Range(1, 2).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        }).ToArray();
    }
}

