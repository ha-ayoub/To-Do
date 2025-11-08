using Microsoft.AspNetCore.Mvc;
using TodoApi.DTOs;
using TodoApi.Services.Interfaces;

namespace TodoApi.Controllers
{
    public class PriorityController : BaseAPIController
    {
        private readonly IPriorityService _priorityService;
        private readonly ILogger<PriorityController> _logger;

        public PriorityController(IPriorityService priorityService, ILogger<PriorityController> logger)
        {
            _priorityService = priorityService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PriorityDto>>> GetPriorities()
        {
            try
            {
                var priorities = await _priorityService.GetAllPrioritiesAsync();
                return Ok(priorities);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetPriorities endpoint");
                return StatusCode(500, new { message = "An error occurred while retrieving priorities" });
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<PriorityDto>> GetPriority(int id)
        {
            try
            {
                var priority = await _priorityService.GetPriorityByIdAsync(id);

                if (priority == null)
                    return NotFound(new { message = $"Priority with id {id} not found" });

                return Ok(priority);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetPriority endpoint for id {Id}", id);
                return StatusCode(500, new { message = "An error occurred while retrieving the priority" });
            }
        }

    }
}
