using TodoApi.DTOs;
using TodoApi.Models;

namespace TodoApi.Repositories.Interfaces
{
    public interface ITodoRepository
    {
        Task<PaginatedResponse<TodoItem>> GetAllAsync(string userId, int pageNumber = 1, int pageSize = 10, bool? isCompleted = null, int? priorityId = null);
        Task<TodoItem?> GetByIdAsync(int id);
        Task<TodoItem> CreateAsync(TodoItem todoItem);
        Task<TodoItem> UpdateAsync(TodoItem todoItem);
        Task<bool> DeleteAsync(int id);
        Task<int> DeleteCompletedAsync(string userId);
        Task<bool> ExistsAsync(int id);
        Task<(int total, int completed, int pending, int urgent)> GetStatsAsync(string userId);
    }
}