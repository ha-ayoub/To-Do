using TodoApi.Models;

namespace TodoApi.Repositories.Interfaces
{
    public interface ITodoRepository
    {
        Task<IEnumerable<TodoItem>> GetAllAsync(bool? isCompleted = null, int? priority = null);
        Task<TodoItem?> GetByIdAsync(int id);
        Task<TodoItem> CreateAsync(TodoItem todoItem);
        Task<TodoItem> UpdateAsync(TodoItem todoItem);
        Task<bool> DeleteAsync(int id);
        Task<int> DeleteCompletedAsync();
        Task<bool> ExistsAsync(int id);
        Task<(int total, int completed, int pending, int urgent)> GetStatsAsync();
    }
}
