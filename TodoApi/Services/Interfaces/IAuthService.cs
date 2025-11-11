using TodoApi.DTOs.Auth;

namespace TodoApi.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
        Task<AuthResponseDto> LoginAsync(LoginDto dto);
        Task<AuthResponseDto> RefreshTokenAsync(RefreshTokenDto dto);
        Task<bool> RevokeTokenAsync(string userId, string refreshToken);
        Task<bool> ChangePasswordAsync(string userId, ChangePasswordDto dto);
    }
}
