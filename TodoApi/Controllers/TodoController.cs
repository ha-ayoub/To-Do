using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TodoApi.DTOs;
using TodoApi.Extensions;
using TodoApi.Services.Interfaces;

namespace TodoApi.Controllers
{
    [Authorize]
    public class TodoController : BaseAPIController
    {
        private readonly ITodoService _todoService;
        private readonly ILogger<TodoController> _logger;
        public TodoController(ITodoService todoService, ILogger<TodoController> logger)
        {
            _todoService = todoService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItemDto>>> GetTodoItems(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] bool? isCompleted = null,
            [FromQuery] int? priorityId = null)
        {
            try
            {
                var userId = User.GetUserId();
                if (userId == null)
                    return Unauthorized();

                if (pageNumber < 1) pageNumber = 1;
                if (pageSize < 1) pageSize = 10;
                if (pageSize > 100) pageSize = 100;

                var todos = await _todoService.GetAllTodosAsync(userId, pageNumber, pageSize, isCompleted, priorityId);
                return Ok(todos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetTodoItems endpoint");
                return StatusCode(500, new { message = "An error occurred while retrieving todo items" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItemDto>> GetTodoItem(int id)
        {
            try
            {
                var todo = await _todoService.GetTodoByIdAsync(id);

                if (todo == null)
                    return NotFound(new { message = $"Todo item with id {id} not found" });

                return Ok(todo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetTodoItem endpoint for id {Id}", id);
                return StatusCode(500, new { message = "An error occurred while retrieving the todo item" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<TodoItemDto>> CreateTodoItem(CreateTodoDto dto)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                    return Unauthorized();

                dto.UserId = userId;
                var created = await _todoService.CreateTodoAsync(dto);
                return CreatedAtAction(nameof(GetTodoItem), new { id = created.Id }, created);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreateTodoItem endpoint");
                return StatusCode(500, new { message = "An error occurred while creating the todo item" });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TodoItemDto>> UpdateTodoItem(int id, UpdateTodoDto dto)
        {
            try
            {
                var userId = User.GetUserId();
                if (userId == null)
                    return Unauthorized();

                dto.UserId = userId;

                var updated = await _todoService.UpdateTodoAsync(id, dto);

                if (updated == null)
                    return NotFound(new { message = $"Todo item with id {id} not found" });

                return Ok(updated);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in UpdateTodoItem endpoint for id {Id}", id);
                return StatusCode(500, new { message = "An error occurred while updating the todo item" });
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            try
            {
                var deleted = await _todoService.DeleteTodoAsync(id);

                if (!deleted)
                    return NotFound(new { message = $"Todo item with id {id} not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in DeleteTodoItem endpoint for id {Id}", id);
                return StatusCode(500, new { message = "An error occurred while deleting the todo item" });
            }
        }


        [HttpDelete("completed")]
        public async Task<IActionResult> DeleteCompletedTodos()
        {
            try
            {
                var userId = User.GetUserId();
                if (userId == null)
                    return Unauthorized();

                var count = await _todoService.DeleteCompletedTodosAsync(userId);
                return Ok(new { deletedCount = count, message = $"{count} completed todo(s) deleted" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in DeleteCompletedTodos endpoint");
                return StatusCode(500, new { message = "An error occurred while deleting completed todos" });
            }
        }


        [HttpGet("stats")]
        public async Task<ActionResult<TodoStatsDto>> GetStats()
        {
            try
            {
                var userId = User.GetUserId();
                if (userId == null)
                    return Unauthorized();

                var stats = await _todoService.GetStatsAsync(userId);
                return Ok(stats);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetStats endpoint");
                return StatusCode(500, new { message = "An error occurred while retrieving stats" });
            }
        }
    }
}
