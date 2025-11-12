using AutoMapper;
using TodoApi.DTOs;
using TodoApi.DTOs.Auth;
using TodoApi.Models;

namespace TodoApi.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile() {

            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email ?? string.Empty));

            CreateMap<User, UserProfileDto>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email ?? string.Empty))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber ?? string.Empty))
                .ForMember(dest => dest.TotalTodos, opt => opt.Ignore())
                .ForMember(dest => dest.CompletedTodos, opt => opt.Ignore());

            CreateMap<RegisterDto, User>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow));

            CreateMap<User, AuthResponseDto>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email ?? string.Empty))
                .ForMember(dest => dest.ExpiresAt, opt => opt.MapFrom(src => DateTime.UtcNow.AddMinutes(60)));
        }
    }
}
