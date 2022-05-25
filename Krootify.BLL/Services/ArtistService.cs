
using AutoMapper;
using BLL.Interfaces;
using Common.DTOs.Artist;
using Common.DTOs.Song;
using Common.Exceptions;
using Common.PagedResult;
using Dal.Constants;
using Dal.Extensions.Specifications;
using Dal.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class ArtistService : IArtistService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Artist> _artistRepository;
        private readonly IUploadService _uploadService;

        public ArtistService(IMapper mapper, IRepository<Artist> artistRepository, IUploadService uploadService)
        {
            _mapper = mapper;
            _artistRepository = artistRepository;
            _uploadService = uploadService;
        }

        public async Task<ArtistToReturnDTO> CreateArtist(ArtistToCreateDTO artistToCreate)
        {
            if (artistToCreate.Photo.Length > 0)
            {
                var photoUrl = await _uploadService.UploadAsync(artistToCreate.Photo.OpenReadStream(),
                    Guid.NewGuid().ToString(), artistToCreate.Photo.ContentType);

                var artist = new Artist();

                var dataToUpload = _mapper.Map(artistToCreate, artist);

                artist.PhotoUrl = photoUrl;

                _artistRepository.Add(dataToUpload);

                await _artistRepository.SaveChangesAsync();

                var artistToReturn = _mapper.Map<ArtistToReturnDTO>(artist);

                return artistToReturn;
            }
            else
            {
                throw FileIsNullException.OfType<Artist>();
            }
        }

        public async Task DeleteArtist(int id)
        {
            var data = await _artistRepository.GetById(id);

            if (data == null)
            {
                throw EntityNotFoundException.OfType<Song>(id);
            }

            await _artistRepository.Delete(id);
            await _artistRepository.SaveChangesAsync();

            var photoGuid = data.PhotoUrl.Replace(ApplicationConstants.UrlPhotoBlob, "");

            await _uploadService.DeletePhotoAsync(photoGuid);
        }

        public async Task<ArtistToReturnDTO> GetArtist(int id)
        {
            var data = await _artistRepository.GetById(id);

            return _mapper.Map<ArtistToReturnDTO>(data);
        }

        public async Task<Pagination<ArtistToReturnDTO>> GetArtistsWithSepc(ParamsSpecification paramsSpec)
        {
            var spec = new ArtistSpecification(paramsSpec);

            var data = await _artistRepository.ListAllWithSpec(spec);

            var dataToReturn = _mapper.Map<IReadOnlyList<ArtistToReturnDTO>>(data);

            return new Pagination<ArtistToReturnDTO>(paramsSpec.PageIndex, paramsSpec.PageSize, data.Count, dataToReturn);
        }

        public async Task UpdateArtist(int id, ArtistToUpdateDTO artistToUpdate)
        {
            var data = await _artistRepository.GetById(id);

            var dataToUpdate = _mapper.Map(artistToUpdate, data);

            _artistRepository.Update(dataToUpdate);

            await _artistRepository.SaveChangesAsync();
        }

        public async Task UpdatePhoto(int id, PhotoToUpdateDTO photoToUpdate)
        {
            var data = await _artistRepository.GetById(id);

            await _uploadService.DeletePhotoAsync(data.PhotoUrl.Replace(ApplicationConstants.UrlPhotoBlob, ""));

            var updatedPhotoUrl = await _uploadService.UploadAsync(photoToUpdate.Photo.OpenReadStream(),
                Guid.NewGuid().ToString(), photoToUpdate.Photo.ContentType);

            data.PhotoUrl = updatedPhotoUrl;

            _artistRepository.Update(data);

            await _artistRepository.SaveChangesAsync();
        }
    }
}
