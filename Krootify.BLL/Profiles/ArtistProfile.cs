
using AutoMapper;
using Common.DTOs.Artist;
using Domain;

namespace BLL.Profiles
{
    public class ArtistProfile : Profile
    {
        public ArtistProfile()
        {
            CreateMap<Artist, ArtistToReturnDTO>();
            CreateMap<ArtistToUpdateDTO, Artist>();
            CreateMap<ArtistToCreateDTO, Artist>();
        }
    }
}
