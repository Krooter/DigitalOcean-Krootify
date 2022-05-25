using AutoMapper;
using Common.DTOs.PlayList;
using Domain;

namespace BLL.Profiles
{
    public class PlayListProfile : Profile
    {
        public PlayListProfile()
        {
            CreateMap<PlayListToCreateOrUpdateDTO, PlayList>();
            CreateMap<PlayList, PlayListToReturnDTO>()
                .ForMember(d => d.User, o => o.MapFrom(s => s.User.GetFullName()));
            CreateMap<PlayListToCreateOrUpdateDTO, PlayList>();

            CreateMap<PlayListSong, PlayListSongsForReturnDTO>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Songs.Id))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Songs.Name))
                .ForMember(d => d.Albums, o => o.MapFrom(s => s.Songs.Albums.Name))
                .ForMember(d => d.Artists, o => o.MapFrom(s => s.Songs.Artists.SceneName))
                .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.Songs.PhotoUrl))
                .ForMember(d => d.SongUrl, o => o.MapFrom(s => s.Songs.SongUrl));
            CreateMap<PlayListSongToCreateDTO, PlayListSong>();
            CreateMap<PlayList, PlayListWithSongsToReturnDTO>();
        }
    }
}
