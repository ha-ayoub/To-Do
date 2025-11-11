using TodoApi.Models;

namespace TodoApi.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateAccessToken(User user);
        RefreshToken GenerateRefreshToken(string userId);
        string? ValidateToken(string token);
    }
}
