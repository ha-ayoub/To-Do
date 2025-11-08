namespace TodoApi.DTOs
{
    public class CreateTodoDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public int Priority { get; set; } = 0;
    }

    public class UpdateTodoDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public bool? IsCompleted { get; set; }
        public int? Priority { get; set; }
    }

    public class TodoItemDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
        public int Priority { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
    }

    public class TodoStatsDto
    {
        public int Total { get; set; }
        public int Completed { get; set; }
        public int Pending { get; set; }
        public int Urgent { get; set; }
    }

}
