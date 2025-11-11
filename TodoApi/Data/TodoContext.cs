using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Data
{
    public class TodoContext : IdentityDbContext<User>
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TodoItem>(entity =>
            {
                entity.HasOne(t => t.User)
                    .WithMany(u => u.TodoItems)
                    .HasForeignKey(t => t.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(t => t.Priority)
                    .WithMany(p => p.TodoItems)
                    .HasForeignKey(t => t.PriorityId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.HasOne(rt => rt.User)
                    .WithMany(u => u.RefreshTokens)
                    .HasForeignKey(rt => rt.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(rt => rt.Token).IsUnique();
            });


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