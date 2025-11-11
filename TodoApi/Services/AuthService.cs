using AutoMapper;
using Microsoft.AspNetCore.Identity;
using TodoApi.DTOs.Auth;
using TodoApi.Models;
using TodoApi.Repositories.Interfaces;
using TodoApi.Services.Interfaces;

namespace TodoApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<AuthService> _logger;
        private readonly IMapper _mapper;

        public AuthService( UserManager<User> userManager, ITokenService tokenService, IUserRepository userRepository, ILogger<AuthService> logger, IMapper mapper)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _userRepository = userRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
        {
            var existingUser = await _userManager.FindByEmailAsync(dto.Email);
            if (existingUser != null)
            {
                throw new InvalidOperationException("A user with this email address already exists");
            }

            var user = _mapper.Map<User>(dto);

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new InvalidOperationException($"Error creating user:{errors}");
            }

            _logger.LogInformation("New user created: {Email}", user.Email);
            return await GenerateAuthResponse(user);
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                throw new UnauthorizedAccessException("Incorrect email or password");
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!isPasswordValid)
            {
                throw new UnauthorizedAccessException("Incorrect email or password");
            }

            _logger.LogInformation("Connexion réussie pour: {Email}", user.Email);

            return await GenerateAuthResponse(user);
        }

        public async Task<AuthResponseDto> RefreshTokenAsync(RefreshTokenDto dto)
        {
            var userId = _tokenService.ValidateToken(dto.Token);
            if (userId == null)
            {
                var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
                var jwtToken = handler.ReadJwtToken(dto.Token);
                userId = jwtToken.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            }

            if (userId == null)
            {
                throw new UnauthorizedAccessException("Invalid token");
            }

            var refreshToken = await _userRepository.GetRefreshTokenAsync(dto.RefreshToken);
            if (refreshToken == null || !refreshToken.IsActive || refreshToken.UserId != userId)
            {
                throw new UnauthorizedAccessException("Invalid refresh token");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new UnauthorizedAccessException("User not found");
            }

            await _userRepository.RevokeRefreshTokenAsync(refreshToken);

            return await GenerateAuthResponse(user);
        }

        public async Task<bool> RevokeTokenAsync(string userId, string refreshToken)
        {
            var token = await _userRepository.GetRefreshTokenAsync(refreshToken);
            if (token == null || token.UserId != userId)
            {
                return false;
            }

            await _userRepository.RevokeRefreshTokenAsync(token);
            _logger.LogInformation("Token revoked for user: {UserId}", userId);
            return true;
        }

        public async Task<bool> ChangePasswordAsync(string userId, ChangePasswordDto dto)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new InvalidOperationException("User not found");
            }

            var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new InvalidOperationException($"Error changing password: {errors}");
            }

            _logger.LogInformation("Password changed to: {Email}", user.Email);
            return true;
        }

        private async Task<AuthResponseDto> GenerateAuthResponse(User user)
        {
            var accessToken = _tokenService.GenerateAccessToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken(user.Id);

            await _userRepository.AddRefreshTokenAsync(refreshToken);

            var authResponseDto = _mapper.Map<AuthResponseDto>(user);
            authResponseDto.LastName = user.LastName;
            authResponseDto.Token = accessToken;

            return authResponseDto;

        }
    }
}
