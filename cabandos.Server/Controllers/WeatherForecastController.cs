using cabandos.Server.Models;
using cabandos.Server.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using System;
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

    private static List<List<WeatherForecast>> _weatherForecasts { get; set; }

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
        _weatherForecasts ??= GetWeatherForecastsGroup();
    }

    [HttpGet("GetWeatherForecast")]
    public IEnumerable<IEnumerable<WeatherForecast>> GetWeatherForecasts() => _weatherForecasts;

    [HttpGet("LoadNewData")]
    public List<List<WeatherForecast>> LoadNewData()
    {
        _weatherForecasts = GetWeatherForecastsGroup();
        return _weatherForecasts;
    }

    [HttpPost("CreateNewForecast")]
    public WeatherForecast CreateNewForecast(int columnIndex)
    {
        var newWeatherForecast = GetWeatherForecast();
        _weatherForecasts[columnIndex].Add(GetWeatherForecast());
        return newWeatherForecast;
    }

    [HttpPost("EditWeatherForecast")]
    public void EditWeatherForecast([FromBody] List<List<WeatherForecast>> newWeatherForecastsGroup)
    {
        _weatherForecasts = newWeatherForecastsGroup;
        return;
    }

    [HttpPost("DeleteWeatherForecast")]
    public void DeleteWeatherForecast([FromBody] DeleteForecastRequestDTO forecast)
    {
        var forecastToDelete = _weatherForecasts.ElementAt(forecast.ColumnFrom)
            .FirstOrDefault(f => f.Id == forecast.Id);
        if (forecastToDelete != default)
        {
            _weatherForecasts.ElementAt(forecast.ColumnFrom).Remove(forecastToDelete);
        }
        return;
    }

    private List<List<WeatherForecast>> GetWeatherForecastsGroup() =>
    [WeatherForecasts, WeatherForecasts, WeatherForecasts];

    private List<WeatherForecast> WeatherForecasts => Enumerable.Range(1, 2).Select(index => GetWeatherForecast(index)).ToList();

    private static WeatherForecast GetWeatherForecast(int? index = null) 
    {
        index ??= Random.Shared.Next(-10, 10);
        
        return new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays((double)index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        };
    }
}

