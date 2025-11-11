using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(string userId);
        Task<User?> GetByEmailAsync(string email);
        Task<RefreshToken?> GetRefreshTokenAsync(string token);
        Task<RefreshToken> AddRefreshTokenAsync(RefreshToken refreshToken);
        Task RevokeRefreshTokenAsync(RefreshToken refreshToken);
        Task<User> UpdateAsync(User user);
        Task<bool> DeleteAsync(string userId);
        Task<(int total, int completed)> GetUserTodoStatsAsync(string userId);
    }
}
