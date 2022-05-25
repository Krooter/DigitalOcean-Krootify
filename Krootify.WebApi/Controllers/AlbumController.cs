using BLL.Interfaces;
using Common.DTOs;
using Common.DTOs.Album;
using Common.DTOs.Song;
using Dal.Extensions.Specifications;
using Domain.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    public class AlbumController : BaseApiController
    {
        private readonly IAlbumService _albumService;

        public AlbumController(IAlbumService albumService)
        {
            _albumService = albumService;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AlbumToReturnDTO>>> GetPagedAlbums([FromQuery] ParamsSpecification paramsSpec)
        {
            return Ok(await _albumService.GetAlbumsWithSpecs(paramsSpec));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AlbumToReturnDTO>> GetAlbum(int id)
        {
            return Ok(await _albumService.GetAlbum(id));
        }

        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAlbum(int id)
        {
            await _albumService.DeleteAlbum(id);

            return NoContent();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAlbum(int id, AlbumToUpdateDTO albumToUpdate)
        {
            await _albumService.UpdateAlbum(id, albumToUpdate);

            return Ok();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPut("{id}/photo"), DisableRequestSizeLimit]
        public async Task<ActionResult> UpdatePhoto(int id, [FromForm] PhotoToUpdateDTO photoToUpdate)
        {
            await _albumService.UpdatePhoto(id, photoToUpdate);

            return Ok();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult> CreateAlbum([FromForm] AlbumToCreateDTO albumToCreate)
        {
            var result = await _albumService.CreateAlbum(albumToCreate);
            return CreatedAtAction(nameof(GetAlbum), new { id = result.Id }, result);
        }
    }
}
