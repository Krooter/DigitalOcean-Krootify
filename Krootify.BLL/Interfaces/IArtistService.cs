
using Common.DTOs;
using Common.DTOs.Artist;
using Common.DTOs.Song;
using Common.PagedResult;
using Dal.Extensions.Specifications;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IArtistService
    {
        Task<Pagination<ArtistToReturnDTO>> GetArtistsWithSepc(ParamsSpecification paramsSpec);
        Task UpdateArtist(int id, ArtistToUpdateDTO artistToUpdate);
        Task UpdatePhoto(int id, PhotoToUpdateDTO photoToUpdate);
        Task<ArtistToReturnDTO> CreateArtist(ArtistToCreateDTO artistToCreate);
        Task<ArtistToReturnDTO> GetArtist(int id);
        Task DeleteArtist(int id);
    }
}
