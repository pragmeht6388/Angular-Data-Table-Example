using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;
using Distributed_Cahing_POC.Data;
using Distributed_Cahing_POC.Services;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Distributed_Cahing_POC.Services
{
    public class WeatherService: IWeatherService
    {
        private readonly AppDbContext _context;
        private readonly IDistributedCache _cache;
        private const string AllForecastsCacheKey = "WeatherForecast";
        private readonly DistributedCacheEntryOptions _cacheOptions = new()
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
        };
        public WeatherService(AppDbContext context, IDistributedCache cache)
        {
            _context = context;
            _cache = cache;
        }

        public async Task<List<WeatherForecast>> GetForecastsAsync()
        {
            // Try to get from cache first
            var cachedData = await _cache.GetStringAsync(AllForecastsCacheKey);
            if (cachedData != null)
            {
                return JsonSerializer.Deserialize<List<WeatherForecast>>(cachedData)!;
            }
         
            // Get from database if not in cache
            var forecasts = await _context.WeatherForecasts.ToListAsync();

            // Store in cache
            await _cache.SetStringAsync(
                AllForecastsCacheKey,
                JsonSerializer.Serialize(forecasts),
                _cacheOptions);

            return (forecasts);
        }
        public async Task<WeatherForecast> CreateForecastAsync(WeatherForecast forecast)
        {
            _context.WeatherForecasts.Add(forecast);
            await _context.SaveChangesAsync();

            // Invalidate cache since data has changed
            await _cache.RemoveAsync(AllForecastsCacheKey);

            return forecast;
        }

        public async Task<WeatherForecast?> GetForecastAsync(int id)
        {
            string cacheKey = $"weather_forecast_{id}";

            // Try cache first
            var cachedData = await _cache.GetStringAsync(cacheKey);
            if (cachedData != null)
            {
                return JsonSerializer.Deserialize<WeatherForecast>(cachedData);
            }

            // Get from database
            var forecast = await _context.WeatherForecasts.FindAsync(id);
            if (forecast == null) return null;

            // Cache the individual forecast
            await _cache.SetStringAsync(
                cacheKey,
                JsonSerializer.Serialize(forecast),
                _cacheOptions);

            return forecast;
        }

    }
}
