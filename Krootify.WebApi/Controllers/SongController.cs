using BLL.Interfaces;
using Common.DTOs;
using Common.DTOs.Song;
using Dal.Extensions.Specifications;
using Domain.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    public class SongController : BaseApiController
    {
        private readonly ISongService _songService;

        public SongController(ISongService songService)
        {
            _songService = songService;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<SongToReturnDTO>>> GetPagedSongs([FromQuery]ParamsSpecification paramsSpec)
        {
            return Ok(await _songService.GetSongsWithSpec(paramsSpec));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SongToReturnDTO>> GetSong(int id)
        {
            return Ok(await _songService.GetSongWithSpec(id));
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult> CreateSong([FromForm]SongToCreateDTO songToCreate)
        {
            var result = await _songService.CreateSong(songToCreate);
            return CreatedAtAction(nameof(GetSong), new { id = result.Id }, result);
        }

        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSong(int id)
        {
            await _songService.DeleteSong(id);
            return NoContent();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateSong(int id, SongToUpdateDTO songToUpdate)
        {
            await _songService.UpdateSong(id, songToUpdate);

            return Ok(songToUpdate);
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPut("{id}/photo"), DisableRequestSizeLimit]
        public async Task<ActionResult> UpdatePhoto(int id, [FromForm]PhotoToUpdateDTO photoToUpdate)
        {
            await _songService.UpdatePhoto(id, photoToUpdate);

            return Ok(photoToUpdate);
        }

        [HttpGet("genres")]
        public async Task<ActionResult<SongGenreToReturnDTO>> GetAllGenres()
        {
            return Ok(await _songService.GetAllGenres());
        }

        [HttpGet("categories")]
        public async Task<ActionResult<SongCategoryToReturnDTO>> GetAllCategories()
        {
            return Ok(await _songService.GetAllCategories());
        }
    }
}
