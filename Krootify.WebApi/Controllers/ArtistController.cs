using BLL.Interfaces;
using Common.DTOs;
using Common.DTOs.Artist;
using Common.DTOs.Song;
using Dal.Extensions.Specifications;
using Domain.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    public class ArtistController : BaseApiController
    {
        private readonly IArtistService _artistService;

        public ArtistController(IArtistService artistService)
        {
            _artistService = artistService;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ArtistToReturnDTO>>> GetPagedArtists([FromQuery] ParamsSpecification paramsSpec)
        {
            return Ok(await _artistService.GetArtistsWithSepc(paramsSpec));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArtistToReturnDTO>> GetArtist(int id)
        {
            return Ok(await _artistService.GetArtist(id));
        }

        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteArtist(int id)
        {
            await _artistService.DeleteArtist(id);

            return NoContent();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateArtist(int id, ArtistToUpdateDTO artistToUpdate)
        {
            await _artistService.UpdateArtist(id, artistToUpdate);

            return Ok();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPut("{id}/photo"), DisableRequestSizeLimit]
        public async Task<ActionResult> UpdatePhoto(int id, [FromForm]PhotoToUpdateDTO photoToUpdate)
        {
            await _artistService.UpdatePhoto(id, photoToUpdate);

            return Ok();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult> CreateArtist([FromForm]ArtistToCreateDTO artistToCreate)
        {
            var result = await _artistService.CreateArtist(artistToCreate);
            return CreatedAtAction(nameof(GetArtist), new { id = result.Id }, result);
        }
    }
}
