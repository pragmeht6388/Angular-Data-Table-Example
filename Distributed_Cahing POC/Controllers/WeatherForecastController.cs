using Distributed_Cahing_POC;
using Distributed_Cahing_POC.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace WeatherCacheDemo.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{

    private readonly IWeatherService _weatherService;

    public WeatherForecastController(IWeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    [HttpGet("Get")]
    public async Task<ActionResult<List<WeatherForecast>>> Get()
    {
        return Ok(await _weatherService.GetForecastsAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<WeatherForecast>> Get(int id)
    {
        var forecast = await _weatherService.GetForecastAsync(id);
        if (forecast == null) return NotFound();
        return Ok(forecast);
    }

    [HttpPost("Post")]
    public async Task<ActionResult<WeatherForecast>> Post(WeatherForecast forecast)
    {
        var created = await _weatherService.CreateForecastAsync(forecast);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }


}


