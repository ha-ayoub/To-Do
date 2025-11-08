using AutoMapper;
using TodoApi.DTOs;
using TodoApi.Models;
using TodoApi.Repositories.Interfaces;
using TodoApi.Services.Interfaces;

namespace TodoApi.Services
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<TodoService> _logger;

        public TodoService(ITodoRepository repository, IMapper mapper, ILogger<TodoService> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<TodoItemDto> CreateTodoAsync(CreateTodoDto dto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(dto.Title))
                    throw new ArgumentException("Title cannot be empty");

                var todoItem = _mapper.Map<TodoItem>(dto);
                todoItem.CreatedAt = DateTime.UtcNow;
                todoItem.IsCompleted = false;

                var created = await _repository.CreateAsync(todoItem);

                _logger.LogInformation("Todo created with id {Id}", created.Id);

                return _mapper.Map<TodoItemDto>(created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating todo");
                throw;
            }
        }

        public async Task<TodoItemDto?> UpdateTodoAsync(int id, UpdateTodoDto dto)
        {
            try
            {
                var existingTodo = await _repository.GetByIdAsync(id);
                if (existingTodo == null)
                    return null;

                if (!string.IsNullOrWhiteSpace(dto.Title))
                    existingTodo.Title = dto.Title.Trim();

                if (dto.Description != null)
                    existingTodo.Description = dto.Description.Trim();

                if (dto.Priority.HasValue)
                    existingTodo.Priority = dto.Priority.Value;

                if (dto.IsCompleted.HasValue)
                {
                    existingTodo.IsCompleted = dto.IsCompleted.Value;
                    existingTodo.CompletedAt = dto.IsCompleted.Value ? DateTime.UtcNow : null;
                }

                var updated = await _repository.UpdateAsync(existingTodo);

                _logger.LogInformation("Todo updated with id {Id}", id);

                return _mapper.Map<TodoItemDto>(updated);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating todo with id {Id}", id);
                throw;
            }
        }

        public async Task<int> DeleteCompletedTodosAsync()
        {
            try
            {
                var count = await _repository.DeleteCompletedAsync();

                _logger.LogInformation("{Count} completed todos deleted", count);

                return count;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting completed todos");
                throw;
            }
        }

        public async Task<bool> DeleteTodoAsync(int id)
        {
            try
            {
                var result = await _repository.DeleteAsync(id);

                if (result)
                    _logger.LogInformation("Todo deleted with id {Id}", id);
                else
                    _logger.LogWarning("Attempted to delete non-existent todo with id {Id}", id);

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting todo with id {Id}", id);
                throw;
            }
        }

        public async Task<IEnumerable<TodoItemDto>> GetAllTodosAsync(bool? isCompleted = null, int? priority = null)
        {
            try
            {
                var todos = await _repository.GetAllAsync(isCompleted, priority);
                return _mapper.Map<IEnumerable<TodoItemDto>>(todos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting all todos");
                throw;
            }
        }

        public async Task<TodoStatsDto> GetStatsAsync()
        {
            try
            {
                var (total, completed, pending, urgent) = await _repository.GetStatsAsync();

                return new TodoStatsDto
                {
                    Total = total,
                    Completed = completed,
                    Pending = pending,
                    Urgent = urgent
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting stats");
                throw;
            }
        }

        public async Task<TodoItemDto?> GetTodoByIdAsync(int id)
        {
            try
            {
                var todo = await _repository.GetByIdAsync(id);
                return todo == null ? null : _mapper.Map<TodoItemDto>(todo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting todo with id {Id}", id);
                throw;
            }
        }
    }
}
