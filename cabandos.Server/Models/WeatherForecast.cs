using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace cabandos.Server.Models;
public class WeatherForecast
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public DateOnly Date { get; set; }

    public int TemperatureC { get; set; }

    public string? Summary { get; set; }

    public int? temperatureF => 32 + (int)(TemperatureC / 0.5556);
}