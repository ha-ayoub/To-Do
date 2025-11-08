using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
    public class Priority
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string Color { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Icon { get; set; } = string.Empty;

        public int Order { get; set; }

        public ICollection<TodoItem> TodoItems { get; set; } = new List<TodoItem>();
    }
}
