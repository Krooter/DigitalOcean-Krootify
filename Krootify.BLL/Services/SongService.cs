using AutoMapper;
using BLL.Interfaces;
using Common.DTOs;
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
    public class SongService : ISongService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Song> _songRepository;
        private readonly IUploadService _uploadService;
        private readonly IRepository<SongGenre> _genreRepository;
        private readonly IRepository<SongCategory> _categoryRepository;

        public SongService(IMapper mapper, IRepository<Song> songRepository, 
            IUploadService uploadService, IRepository<SongGenre> genreRepository, 
            IRepository<SongCategory> categoryRepository)
        {
            _mapper = mapper;
            _songRepository = songRepository;
            _uploadService = uploadService;
            _genreRepository = genreRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<Pagination<SongToReturnDTO>> GetSongsWithSpec(ParamsSpecification paramsSpec)
        {
            var spec = new SongSpecification(paramsSpec);

            var data = await _songRepository.ListAllWithSpec(spec);

            var totalCount = await _songRepository.CountAsync();

            var dataToReturn = _mapper.Map<IReadOnlyList<SongToReturnDTO>>(data);

            return new Pagination<SongToReturnDTO>(paramsSpec.PageIndex, paramsSpec.PageSize, totalCount, dataToReturn);
        }

        public async Task<SongToReturnDTO> GetSongWithSpec(int id)
        {
            var spec = new SongSpecification(id);

            var data = await _songRepository.GetEntityWithSpec(spec);

            return _mapper.Map<SongToReturnDTO>(data);
        }

        public async Task<SongToReturnDTO> CreateSong(SongToCreateDTO songToCreate)
        {
            if (songToCreate.Song.Length > 0 && songToCreate.Photo.Length > 0)
            {
                var photoUrl = await _uploadService.UploadAsync(songToCreate.Photo.OpenReadStream(),
                    Guid.NewGuid().ToString(), songToCreate.Photo.ContentType);

                var songUrl = await _uploadService.UploadAsync(songToCreate.Song.OpenReadStream(),
                    Guid.NewGuid().ToString(), songToCreate.Song.ContentType);

                var spec = new SongSpecification(songUrl);

                var song = await _songRepository.GetEntityWithSpec(spec);

                if (song != null)
                {
                    throw EntityNotFoundException.OfType<Song>();
                }

                var songData = new Song
                {
                    SongUrl = songUrl,
                    PhotoUrl = photoUrl,
                    Listeners = 0,
                    Duration = new TimeSpan(0,0,0,0, (int)songToCreate.Song.Length * 8 / 192)
                };


                var dataToUpload = _mapper.Map(songToCreate, songData);

                _songRepository.Add(dataToUpload);

                await _songRepository.SaveChangesAsync();

                return _mapper.Map<SongToReturnDTO>(dataToUpload);
            }
            else
            {
                throw FileIsNullException.OfType<Song>();
            }
        }

        public async Task DeleteSong(int id)
        {
            var data = await _songRepository.GetById(id);

            if(data == null)
            {
                throw EntityNotFoundException.OfType<Song>(id);
            }

            await _songRepository.Delete(id);
            await _songRepository.SaveChangesAsync();

            var photoGuid = data.PhotoUrl.Replace(ApplicationConstants.UrlPhotoBlob, "");
            var songGuid = data.SongUrl.Replace(ApplicationConstants.UrlSongsBlob, "");

            await _uploadService.DeletePhotoAsync(photoGuid);
            await _uploadService.DeleteSongAsync(songGuid);
        }

        public async Task<IReadOnlyList<SongGenreToReturnDTO>> GetAllGenres()
        {
            var data = await _genreRepository.ListAll();

            return _mapper.Map<IReadOnlyList<SongGenreToReturnDTO>>(data);
        }

        public async Task<IReadOnlyList<SongCategoryToReturnDTO>> GetAllCategories()
        {
            var data = await _categoryRepository.ListAll();

            return _mapper.Map<IReadOnlyList<SongCategoryToReturnDTO>>(data);
        }

        public async Task UpdateSong(int id, SongToUpdateDTO songToUpdate)
        {
            var data = await _songRepository.GetById(id);

            var dataToUpdate = _mapper.Map(songToUpdate, data);

            _songRepository.Update(dataToUpdate);

            await _songRepository.SaveChangesAsync();
        }

        public async Task UpdatePhoto(int id, PhotoToUpdateDTO photoToUpdate)
        {
            var data = await _songRepository.GetById(id);

            await _uploadService.DeletePhotoAsync(data.PhotoUrl.Replace(ApplicationConstants.UrlPhotoBlob, ""));

            var updatedPhotoUrl = await _uploadService.UploadAsync(photoToUpdate.Photo.OpenReadStream(),
                Guid.NewGuid().ToString(), photoToUpdate.Photo.ContentType);

            data.PhotoUrl = updatedPhotoUrl;

            _songRepository.Update(data);

            await _songRepository.SaveChangesAsync();
        }
    }
}
