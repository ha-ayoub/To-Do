using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TodoApi.DTOs;
using TodoApi.Extensions;
using TodoApi.Services.Interfaces;

namespace TodoApi.Controllers
{
    [Authorize]
    public class UserController : BaseAPIController
    {
        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserService userService, ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }


        [HttpGet("profile")]
        public async Task<ActionResult<UserProfileDto>> GetProfile()
        {
            try
            {
                var userId = User.GetUserId();
                if (userId == null)
                    return Unauthorized();

                var profile = await _userService.GetProfileAsync(userId);
                if (profile == null)
                    return NotFound(new { message = "Profile not found" });

                return Ok(profile);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving profile");
                return StatusCode(500, new { message = "An error has occurred" });
            }
        }

        [HttpPut("profile")]
        public async Task<ActionResult<UserDto>> UpdateProfile(UpdateUserDto dto)
        {
            try
            {
                var userId = User.GetUserId();
                if (userId == null)
                    return Unauthorized();

                var user = await _userService.UpdateProfileAsync(userId, dto);
                if (user == null)
                    return NotFound(new { message = "User not found" });

                return Ok(user);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating profile");
                return StatusCode(500, new { message = "An error has occurred" });
            }
        }

        [HttpDelete("account")]
        public async Task<IActionResult> DeleteAccount()
        {
            try
            {
                var userId = User.GetUserId();
                if (userId == null)
                    return Unauthorized();

                var deleted = await _userService.DeleteAccountAsync(userId);
                if (!deleted)
                    return NotFound(new { message = "User not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting account");
                return StatusCode(500, new { message = "An error has occurred" });
            }
        }
    }
}
