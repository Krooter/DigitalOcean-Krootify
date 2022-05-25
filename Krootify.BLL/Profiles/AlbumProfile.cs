using AutoMapper;
using Common.DTOs;
using Common.DTOs.Album;
using Domain;

namespace BLL.Profiles
{
    public class AlbumProfile : Profile
    {
        public AlbumProfile()
        {
            CreateMap<Album, AlbumToReturnDTO>();
            CreateMap<AlbumToCreateDTO, Album>();
            CreateMap<AlbumToUpdateDTO, Album>();
        }
    }
}
