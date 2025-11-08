using TodoApi.Models;

namespace TodoApi.Repositories.Interfaces
{
    public interface IPriorityRepository
    {
        Task<IEnumerable<Priority>> GetAllAsync();
        Task<Priority?> GetByIdAsync(int id);
    }
}
