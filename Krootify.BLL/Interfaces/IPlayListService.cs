using Common.DTOs.PlayList;
using Common.PagedResult;
using Dal.Extensions.Specifications;
using Domain.Auth;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IPlayListService
    {
        Task<IReadOnlyList<PlayListToReturnDTO>> GetPlayListsByUser(ParamsSpecification specification, User user);
        Task<PlayListToReturnDTO> GetPlayListById(User user, int id);
        Task<PlayListToReturnDTO> CreatePlayList(PlayListToCreateOrUpdateDTO playListToCreate, User user);
        Task DeletePlayList(int id, User user);
        Task<PlayListSongsForReturnDTO> AddSongToPlayList(int songId, int playListId, User user);
        Task DeleteSongFromPlayList(int songId, int playListId, User user);
        Task UpdatePlayList(int id, PlayListToCreateOrUpdateDTO playListForUpdate, User user);
    }
}
