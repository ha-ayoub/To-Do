using TodoApi.DTOs;

namespace TodoApi.Services.Interfaces
{
    public interface ITodoService
    {
        Task<IEnumerable<TodoItemDto>> GetAllTodosAsync(bool? isCompleted = null, int? priority = null);
        Task<TodoItemDto?> GetTodoByIdAsync(int id);
        Task<TodoItemDto> CreateTodoAsync(CreateTodoDto dto);
        Task<TodoItemDto?> UpdateTodoAsync(int id, UpdateTodoDto dto);
        Task<bool> DeleteTodoAsync(int id);
        Task<int> DeleteCompletedTodosAsync();
        Task<TodoStatsDto> GetStatsAsync();
    }
}
