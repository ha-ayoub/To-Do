using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.DTOs;
using TodoApi.Models;
using TodoApi.Repositories.Interfaces;

namespace TodoApi.Repositories
{
    public class PriorityRepository : IPriorityRepository
    {
        private readonly TodoContext _context;

        public PriorityRepository(TodoContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Priority>> GetAllAsync()
        {
            return await _context.Priorities
                .OrderBy(p => p.Order)
                .ToListAsync();
        }

        public async Task<Priority?> GetByIdAsync(int id)
        {
            return await _context.Priorities.FindAsync(id);
        }
    }
}
