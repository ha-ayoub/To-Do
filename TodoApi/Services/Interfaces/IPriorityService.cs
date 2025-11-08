using TodoApi.DTOs;

namespace TodoApi.Services.Interfaces
{
    public interface IPriorityService
    {
        Task<IEnumerable<PriorityDto>> GetAllPrioritiesAsync();
        Task<PriorityDto?> GetPriorityByIdAsync(int id);
    }
}
