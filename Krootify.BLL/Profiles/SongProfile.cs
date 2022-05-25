using AutoMapper;
using Common.DTOs;
using Common.DTOs.Song;
using Domain;

namespace BLL.Profiles
{
    public class SongProfile : Profile
    {
        public SongProfile()
        {
            CreateMap<Song, SongToReturnDTO>()
                .ForMember(s => s.Duration, o => o.MapFrom(d => d.Duration.TotalSeconds))
                .ForMember(s => s.Albums, o => o.MapFrom(d => d.Albums.Name))
                .ForMember(s => s.Artists, o => o.MapFrom(d => d.Artists.SceneName))
                .ForMember(s => s.SongCategory, o => o.MapFrom(d => d.SongCategories.CategoryName))
                .ForMember(s => s.SongGenre, o => o.MapFrom(d => d.SongGenres.GenreName));
            CreateMap<SongToCreateDTO, Song>();
            CreateMap<Song, SongForAlbumAndArtistDTO>();
            CreateMap<SongCategory, SongCategoryToReturnDTO>();
            CreateMap<SongGenre, SongGenreToReturnDTO>();
            CreateMap<SongToUpdateDTO, Song>();
        }
    }
}
