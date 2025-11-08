using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.DTOs;
using TodoApi.Models;
using TodoApi.Repositories.Interfaces;

namespace TodoApi.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoContext _context;

        public TodoRepository(TodoContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TodoItem>> GetAllAsync(bool? isCompleted = null, int? priority = null)
        {
            var query = _context.TodoItems.AsQueryable();

            if (isCompleted.HasValue)
                query = query.Where(t => t.IsCompleted == isCompleted.Value);

            if (priority.HasValue)
                query = query.Where(t => t.PriorityId == priority.Value);

            return await query
                .OrderByDescending(t => t.Priority)
                .ThenByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<PaginatedResponse<TodoItem>> GetAllAsync(int pageNumber = 1, int pageSize = 10, bool? isCompleted = null, int? priorityId = null)
        {
            var query = _context.TodoItems
                .Include(t => t.Priority)
                .AsQueryable();

            if (isCompleted.HasValue)
                query = query.Where(t => t.IsCompleted == isCompleted.Value);

            if (priorityId.HasValue)
                query = query.Where(t => t.PriorityId == priorityId.Value);

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderByDescending(t => t.Priority.Order)
                .ThenByDescending(t => t.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PaginatedResponse<TodoItem>
            {
                Items = items,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            };
        }

        public async Task<TodoItem?> GetByIdAsync(int id)
        {
            return await _context.TodoItems.FindAsync(id);
        }

        public async Task<TodoItem> CreateAsync(TodoItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();
            return todoItem;
        }

        public async Task<TodoItem> UpdateAsync(TodoItem todoItem)
        {
            _context.TodoItems.Update(todoItem);
            await _context.SaveChangesAsync();
            return todoItem;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
                return false;

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int> DeleteCompletedAsync()
        {
            var completedItems = await _context.TodoItems
                .Where(t => t.IsCompleted)
                .ToListAsync();

            _context.TodoItems.RemoveRange(completedItems);
            await _context.SaveChangesAsync();

            return completedItems.Count;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.TodoItems.AnyAsync(e => e.Id == id);
        }

        public async Task<(int total, int completed, int pending, int urgent)> GetStatsAsync()
        {
            var total = await _context.TodoItems.CountAsync();
            var completed = await _context.TodoItems.CountAsync(t => t.IsCompleted);
            var pending = total - completed;
            var urgent = await _context.TodoItems.CountAsync(t => t.PriorityId == 3 && !t.IsCompleted);

            return (total, completed, pending, urgent);
        }
    }
}
