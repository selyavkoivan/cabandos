using cabandos.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace cabandos.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "3123123", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<IEnumerable<WeatherForecast>> Get()
        {
            var list = new List<IEnumerable<WeatherForecast>>
    {
        GetWeatherForecasts(),
        GetWeatherForecasts(),
        GetWeatherForecasts()
    };
            return list;
        }

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
}
