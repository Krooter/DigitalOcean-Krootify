using AutoMapper;
using BLL.Interfaces;
using Common.DTOs;
using Common.DTOs.Album;
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
    public class AlbumService : IAlbumService
    {
        private readonly IRepository<Album> _albumRepository;
        private readonly IMapper _mapper;
        private readonly IUploadService _uploadService;

        public AlbumService(IRepository<Album> albumRepository, IMapper mapper, IUploadService uploadService)
        {
            _albumRepository = albumRepository;
            _mapper = mapper;
            _uploadService = uploadService;
        }

        public async Task<AlbumToReturnDTO> CreateAlbum(AlbumToCreateDTO albumToCreate)
        {
            if (albumToCreate.Photo.Length > 0)
            {
                var photoUrl = await _uploadService.UploadAsync(albumToCreate.Photo.OpenReadStream(),
                    Guid.NewGuid().ToString(), albumToCreate.Photo.ContentType);

                var artist = new Album();

                var dataToUpload = _mapper.Map(albumToCreate, artist);

                artist.PhotoUrl = photoUrl;

                _albumRepository.Add(dataToUpload);

                await _albumRepository.SaveChangesAsync();

                var artistToReturn = _mapper.Map<AlbumToReturnDTO>(artist);

                return artistToReturn;
            }
            else
            {
                throw FileIsNullException.OfType<Artist>();
            }
        }

        public async Task DeleteAlbum(int id)
        {
            var data = await _albumRepository.GetById(id);

            if (data == null)
            {
                throw EntityNotFoundException.OfType<Song>(id);
            }

            await _albumRepository.Delete(id);
            await _albumRepository.SaveChangesAsync();

            var photoGuid = data.PhotoUrl.Replace(ApplicationConstants.UrlPhotoBlob, "");

            await _uploadService.DeletePhotoAsync(photoGuid);
        }

        public async Task<AlbumToReturnDTO> GetAlbum(int id)
        {
            var data = await _albumRepository.GetById(id);

            return _mapper.Map<AlbumToReturnDTO>(data);
        }

        public async Task<Pagination<AlbumToReturnDTO>> GetAlbumsWithSpecs(ParamsSpecification paramsSpec)
        {
            var spec = new AlbumSpecification(paramsSpec);

            var data = await _albumRepository.ListAllWithSpec(spec);

            var dataToReturn = _mapper.Map<IReadOnlyList<AlbumToReturnDTO>>(data);

            return new Pagination<AlbumToReturnDTO>(paramsSpec.PageIndex, paramsSpec.PageSize, data.Count, dataToReturn);
        }

        public async Task UpdateAlbum(int id, AlbumToUpdateDTO albumToUpdate)
        {
            var data = await _albumRepository.GetById(id);

            var dataToUpdate = _mapper.Map(albumToUpdate, data);

            _albumRepository.Update(dataToUpdate);

            await _albumRepository.SaveChangesAsync();
        }

        public async Task UpdatePhoto(int id, PhotoToUpdateDTO photoToUpdate)
        {
            var data = await _albumRepository.GetById(id);

            await _uploadService.DeletePhotoAsync(data.PhotoUrl.Replace(ApplicationConstants.UrlPhotoBlob, ""));

            var updatedPhotoUrl = await _uploadService.UploadAsync(photoToUpdate.Photo.OpenReadStream(),
                Guid.NewGuid().ToString(), photoToUpdate.Photo.ContentType);

            data.PhotoUrl = updatedPhotoUrl;

            _albumRepository.Update(data);

            await _albumRepository.SaveChangesAsync();
        }
    }
}
