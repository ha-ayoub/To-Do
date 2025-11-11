using TodoApi.DTOs;

namespace TodoApi.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserProfileDto?> GetProfileAsync(string userId);
        Task<UserDto?> UpdateProfileAsync(string userId, UpdateUserDto dto);
        Task<bool> DeleteAccountAsync(string userId);
    }
}
