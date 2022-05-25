
using Common.DTOs;
using Common.DTOs.Album;
using Common.DTOs.Song;
using Common.PagedResult;
using Dal.Extensions.Specifications;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IAlbumService
    {
        Task<Pagination<AlbumToReturnDTO>> GetAlbumsWithSpecs(ParamsSpecification paramsSpec);
        Task UpdateAlbum(int id, AlbumToUpdateDTO albumToUpdate);
        Task UpdatePhoto(int id, PhotoToUpdateDTO photoToUpdate);
        Task<AlbumToReturnDTO> CreateAlbum(AlbumToCreateDTO albumToCreate);
        Task<AlbumToReturnDTO> GetAlbum(int id);
        Task DeleteAlbum(int id);
    }
}
