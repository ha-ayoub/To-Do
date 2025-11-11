using TodoApi.DTOs;
using TodoApi.Models;

namespace TodoApi.Services.Interfaces
{
    public interface ITodoService
    {
        Task<PaginatedResponse<TodoItemDto>> GetAllTodosAsync(string userId, int pageNumber = 1, int pageSize = 10, bool? isCompleted = null, int? priorityId = null);
        Task<TodoItemDto?> GetTodoByIdAsync(int id);
        Task<TodoItemDto> CreateTodoAsync(CreateTodoDto dto);
        Task<TodoItemDto?> UpdateTodoAsync(int id, UpdateTodoDto dto);
        Task<bool> DeleteTodoAsync(int id);
        Task<int> DeleteCompletedTodosAsync(string userId);
        Task<TodoStatsDto> GetStatsAsync(string userId);
    }
}
