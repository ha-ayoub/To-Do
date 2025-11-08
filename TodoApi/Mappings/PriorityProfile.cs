using AutoMapper;
using TodoApi.DTOs;
using TodoApi.Models;

namespace TodoApi.Mappings
{
    public class PriorityProfile : Profile
    {
        public PriorityProfile() {

            CreateMap<Priority, PriorityDto>();
        }
    }
}
