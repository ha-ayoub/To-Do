using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Priority> Priorities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Priority>().HasData(
                new Priority
                {
                    Id = 1,
                    Name = "Normal",
                    Color = "#6b7280",
                    Icon = "Circle",
                    Order = 0
                },
                new Priority
                {
                    Id = 2,
                    Name = "Important",
                    Color = "#f59e0b",
                    Icon = "AlertTriangle",
                    Order = 1
                },
                new Priority
                {
                    Id = 3,
                    Name = "Urgent",
                    Color = "#ef4444",
                    Icon = "AlertCircle",
                    Order = 2
                }
            );
        }
    }
}