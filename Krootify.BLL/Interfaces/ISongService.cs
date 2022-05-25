using Common.DTOs;
using Common.DTOs.Artist;
using Common.DTOs.Song;
using Common.PagedResult;
using Dal.Extensions.Specifications;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface ISongService
    {
        Task<Pagination<SongToReturnDTO>> GetSongsWithSpec(ParamsSpecification paramsSpec);
        Task<SongToReturnDTO> GetSongWithSpec(int id);
        Task<SongToReturnDTO> CreateSong(SongToCreateDTO songToCreate);
        Task UpdateSong(int id, SongToUpdateDTO songToUpdate);
        Task UpdatePhoto(int id, PhotoToUpdateDTO photoToUpdate);
        Task DeleteSong(int id);
        Task<IReadOnlyList<SongGenreToReturnDTO>> GetAllGenres();
        Task<IReadOnlyList<SongCategoryToReturnDTO>> GetAllCategories();
    }
}
