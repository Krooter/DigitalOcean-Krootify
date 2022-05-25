using BLL.Interfaces;
using Common.DTOs.PlayList;
using Dal.Extensions.Specifications;
using Domain.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Infrastructure.Extensions;

namespace WebApi.Controllers
{
    public class PlayListController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly IPlayListService _playList;

        public PlayListController(UserManager<User> userManager, IPlayListService playList)
        {
            _userManager = userManager;
            _playList = playList;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<PlayListToReturnDTO>>> GetPlayListsByUser([FromQuery]ParamsSpecification specification)
        {
            var data = await _playList.GetPlayListsByUser(specification, await GetUser());

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PlayListToReturnDTO>> GetPlayList(int id)
        {
            var data = await _playList.GetPlayListById(await GetUser(), id);

            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult> CreatePlayList([FromForm]PlayListToCreateOrUpdateDTO playListToCreate)
        {
            var data = await _playList.CreatePlayList(playListToCreate, await GetUser());

            return CreatedAtAction(nameof(GetPlayList), new { id = data.Id }, data);
        }

        [HttpDelete("{id}")]
        public async Task DeletePlayList(int id)
        {
            await _playList.DeletePlayList(id, await GetUser());
        }

        [HttpPost("song")]
        public async Task<ActionResult> AddSongInPlayList([FromBody] PlayListSongToCreateDTO playListSong)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var data = await _playList.AddSongToPlayList(playListSong.SongId, playListSong.PlayListId, await GetUser());

            return CreatedAtAction(nameof(GetPlayList), new { id = data.Id }, data);
        }

        [HttpDelete("{playListId}/song/{songId}")]
        public async Task<ActionResult> DeleteSongFromPlayList(int songId, int playListId)
        {
            await _playList.DeleteSongFromPlayList(songId, playListId, await GetUser());

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePlayList(int id, [FromForm]PlayListToCreateOrUpdateDTO playListForUpdate)
        {

            await _playList.UpdatePlayList(id, playListForUpdate, await GetUser());

            return Ok();
        }

        private async Task<User> GetUser()
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            return await _userManager.FindByEmailAsync(email);
        }
    }
}
