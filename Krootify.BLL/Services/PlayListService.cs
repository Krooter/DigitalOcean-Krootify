using AutoMapper;
using BLL.Interfaces;
using Common.DTOs.PlayList;
using Common.Exceptions;
using Dal.Constants;
using Dal.Extensions.Specifications;
using Dal.Interfaces;
using Domain;
using Domain.Auth;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class PlayListService : IPlayListService
    {
        private readonly IMapper _mapper;
        private readonly IUploadService _uploadService;
        private readonly IRepository<PlayList> _playListRepo;
        private readonly IRepository<PlayListSong> _playListSongRepo;
        private readonly IRepository<Song> _songRepo;

        public PlayListService(IMapper mapper, IUploadService uploadService, IRepository<PlayList> playListRepo,
            IRepository<PlayListSong> playListSongRepo, IRepository<Song> songRepo)
        {
            _mapper = mapper;
            _uploadService = uploadService;
            _playListRepo = playListRepo;
            _playListSongRepo = playListSongRepo;
            _songRepo = songRepo;
        }

        public async Task<PlayListToReturnDTO> CreatePlayList(PlayListToCreateOrUpdateDTO playListToCreate, User user)
        {
            var photoUrl = await _uploadService.UploadAsync(playListToCreate.Photo.OpenReadStream(),
                Guid.NewGuid().ToString(), playListToCreate.Photo.ContentType);

            var data = new PlayList()
            {
                Name = playListToCreate.Name,
                PhotoUrl = photoUrl,
                UserId = user.Id,
                DateAdded = DateTime.UtcNow
            };

            _playListRepo.Add(data);

            await _playListRepo.SaveChangesAsync();

            return _mapper.Map<PlayListToReturnDTO>(data);
        }

        public async Task<PlayListSongsForReturnDTO> AddSongToPlayList(int songId, int playListId, User user)
        {
            var playList = await _playListRepo.GetById(playListId);
            var song = await _songRepo.GetById(songId);

            if (playList == null)
            {
                throw EntityNotFoundException.OfType<PlayList>(playListId);
            }

            if (song == null)
            {
                throw EntityNotFoundException.OfType<Song>(songId);
            }

            if (!CheckPlayListUser(playList, user))
            {
                throw new UnauthorizedAccessException($"You are not authorized!");
            }

            var spec = new PlayListSongsSpecification(playListId, songId);
            var playListSong = _playListSongRepo.GetEntityWithSpec(spec);

            if (playListSong.Result != null)
            {
                throw EntityAlreadyExistException.OfType<PlayListSong>(playListId, songId);
            }

            var data = new PlayListSong
            {
                PlayListId = playListId,
                SongId = songId,
                DateAdded = DateTime.UtcNow
            };

            _playListSongRepo.Add(data);
            await _playListSongRepo.SaveChangesAsync();

            return _mapper.Map<PlayListSongsForReturnDTO>(data);
        }

        public async Task DeletePlayList(int id, User user)
        {
            var playlist = await _playListRepo.GetById(id);

            if(playlist == null)
            {
                throw EntityNotFoundException.OfType<PlayList>(id);
            }

            if (!CheckPlayListUser(playlist, user))
            {
                throw new UnauthorizedAccessException("You are not authorized!");
            }

            await _playListRepo.Delete(id);
            await _playListRepo.SaveChangesAsync();

            await _uploadService.DeletePhotoAsync(playlist.PhotoUrl
                .Replace(ApplicationConstants.UrlPhotoBlob, ""));
        }

        public async Task DeleteSongFromPlayList(int songId, int playListId, User user)
        {
            var playList = await _playListRepo.GetById(playListId);
            var song = await _songRepo.GetById(songId);

            if (playList == null)
            {
                throw EntityNotFoundException.OfType<PlayList>(playListId);
            }

            if (song == null)
            {
                throw EntityNotFoundException.OfType<Song>(songId);
            }

            if (!CheckPlayListUser(playList, user))
            {
                throw new UnauthorizedAccessException($"You are not authorized to do that!");
            }

            var spec = new PlayListSongsSpecification(playListId, songId);

            var dataToDelete = await _playListSongRepo.GetEntityWithSpec(spec);

            if (dataToDelete == null)
            {
                throw EntityNotFoundException.OfType<Song>(songId);
            }

            await _playListSongRepo.Delete(dataToDelete.Id);
            await _playListSongRepo.SaveChangesAsync();
        }

        public async Task<PlayListToReturnDTO> GetPlayListById(User user, int id)
        {
            var spec = new PlayListSpecification(id, user.Id);

            var data = await _playListRepo.GetEntityWithSpec(spec);

            return _mapper.Map<PlayListToReturnDTO>(data);
        }

        public async Task<IReadOnlyList<PlayListToReturnDTO>> GetPlayListsByUser(ParamsSpecification specification, User user)
        {
            var spec = new PlayListSpecification(specification, user.Id);

            var playlists = await _playListRepo.ListAllWithSpec(spec);

            return _mapper.Map<IReadOnlyList<PlayListToReturnDTO>>(playlists);
        }

        public async Task UpdatePlayList(int id, PlayListToCreateOrUpdateDTO playListForUpdate, User user)
        {
            var data = await _playListRepo.GetById(id);

            if (!CheckPlayListUser(data, user))
            {
                throw new UnauthorizedAccessException($"You are not authorized to do that!");
            }

            await _uploadService.DeletePhotoAsync(data.PhotoUrl.Replace(ApplicationConstants.UrlPhotoBlob, ""));
            var newPhotoUrl = await _uploadService.UploadAsync(playListForUpdate.Photo.OpenReadStream(), 
                Guid.NewGuid().ToString(), playListForUpdate.Photo.ContentType);

            var dataForUpdate = _mapper.Map(playListForUpdate, data);
            
            dataForUpdate.PhotoUrl = newPhotoUrl;

            _playListRepo.Update(dataForUpdate);

            await _playListRepo.SaveChangesAsync();
        }

        private bool CheckPlayListUser(PlayList playList, User user)
        {
            if (playList.UserId != user.Id)
            {
                return false;
            }

            return true;
        }
    }
}
