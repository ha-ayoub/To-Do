using System.ComponentModel.DataAnnotations;

namespace TodoApi.DTOs.Auth
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "A password is required")]
        public string Password { get; set; } = string.Empty;
    }
}
