using AutoMapper;
using TodoApi.DTOs;
using TodoApi.Repositories.Interfaces;
using TodoApi.Services.Interfaces;

namespace TodoApi.Services
{
    public class PriorityService : IPriorityService
    {
        private readonly IPriorityRepository _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<PriorityService> _logger;

        public PriorityService(
            IPriorityRepository repository,
            IMapper mapper,
            ILogger<PriorityService> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<IEnumerable<PriorityDto>> GetAllPrioritiesAsync()
        {
            try
            {
                var priorities = await _repository.GetAllAsync();
                return _mapper.Map<IEnumerable<PriorityDto>>(priorities);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting priorities");
                throw;
            }
        }

        public async Task<PriorityDto?> GetPriorityByIdAsync(int id)
        {
            try
            {
                var priority = await _repository.GetByIdAsync(id);
                return priority == null ? null : _mapper.Map<PriorityDto>(priority);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting priority with id {Id}", id);
                throw;
            }
        }
    }
}
