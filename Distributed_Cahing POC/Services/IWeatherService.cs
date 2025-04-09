namespace Distributed_Cahing_POC.Services
{
    public interface IWeatherService
    {
        Task<List<WeatherForecast>> GetForecastsAsync();
        Task<WeatherForecast> CreateForecastAsync(WeatherForecast forecast);
        Task<WeatherForecast?> GetForecastAsync(int id);
    }
}
