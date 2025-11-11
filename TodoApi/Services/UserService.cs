using AutoMapper;
using Microsoft.AspNetCore.Identity;
using TodoApi.DTOs;
using TodoApi.Models;
using TodoApi.Repositories.Interfaces;
using TodoApi.Services.Interfaces;

namespace TodoApi.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UserService> _logger;

        public UserService(UserManager<User> userManager, IUserRepository userRepository, IMapper mapper, ILogger<UserService> logger)
        {
            _userManager = userManager;
            _userRepository = userRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<UserProfileDto?> GetProfileAsync(string userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return null;

            var (total, completed) = await _userRepository.GetUserTodoStatsAsync(userId);

            var userProfile = _mapper.Map<UserProfileDto>(user);
            userProfile.TotalTodos = total;
            userProfile.CompletedTodos = completed;

            return userProfile;
        }

        public async Task<UserDto?> UpdateProfileAsync(string userId, UpdateUserDto dto)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return null;

            if (!string.IsNullOrWhiteSpace(dto.FirstName))
                user.FirstName = dto.FirstName;

            if (!string.IsNullOrWhiteSpace(dto.LastName))
                user.LastName = dto.LastName;

            if (dto.PhoneNumber != null)
                user.PhoneNumber = dto.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new InvalidOperationException($"Error during update: {errors}");
            }

            _logger.LogInformation("Profile updated for: {UserId}", userId);

            return _mapper.Map<UserDto>(user);
        }

        public async Task<bool> DeleteAccountAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return false;

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new InvalidOperationException($"Error during deletion: {errors}");
            }

            _logger.LogInformation("Account deleted: {UserId}", userId);
            return true;
        }
    }
}
