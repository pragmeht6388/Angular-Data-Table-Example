using Distributed_Cahing_POC;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace WeatherCacheDemo.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly IDistributedCache _cache;

    public WeatherForecastController(
        ILogger<WeatherForecastController> logger,
        IDistributedCache cache)
    {
        _logger = logger;
        _cache = cache;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<IActionResult> Get()
    {
        const string cacheKey = "weather_forecast";
        var cachedForecasts = await _cache.GetStringAsync(cacheKey);

        if (cachedForecasts != null)
        {
            _logger.LogInformation("Returning cached weather forecasts");
            return Ok(JsonSerializer.Deserialize<List<WeatherForecast>>(cachedForecasts));
        }

        _logger.LogInformation("Generating new weather forecasts");

        var forecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToList();

        var cacheOptions = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5),
            SlidingExpiration = TimeSpan.FromMinutes(1)
        };

        await _cache.SetStringAsync(
            cacheKey,
            JsonSerializer.Serialize(forecasts),
            cacheOptions);

        return Ok(forecasts);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshCache()
    {
        const string cacheKey = "weather_forecast";
        await _cache.RemoveAsync(cacheKey);
        _logger.LogInformation("Cache cleared for weather forecasts");
        return Ok(new { Message = "Weather forecast cache refreshed" });
    }
}


