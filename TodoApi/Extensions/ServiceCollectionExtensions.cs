using TodoApi.Repositories;
using TodoApi.Repositories.Interfaces;
using TodoApi.Services;
using TodoApi.Services.Interfaces;

namespace TodoApi.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<ITodoRepository, TodoRepository>();

            return services;
        }


        public static IServiceCollection AddBusinessServices(this IServiceCollection services)
        {
            services.AddScoped<ITodoService, TodoService>();

            return services;
        }


        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddRepositories();
            services.AddBusinessServices();

            return services;
        }
    }
}
