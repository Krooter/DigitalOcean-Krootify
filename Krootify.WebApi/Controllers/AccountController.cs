using BLL.Interfaces;
using Common.DTOs.Song;
using Common.DTOs.User;
using Domain.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApi.Infrastructure.Extensions;

namespace WebApi.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        public async Task<ActionResult<UserForLoginDTO>> GetCurrentUser()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);

            var currentUser = await _accountService.GetCurrentUser(email);

            return Ok(currentUser);
        }

        [AllowAnonymous]
        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExists([FromQuery] string email)
        {
            return await _accountService.CheckEmailExists(email);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserForLoginDTO>> Login(LoginDTO loginDTO)
        {
            var login = await _accountService.Login(loginDTO);
            
            return Ok(login);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserForLoginDTO>> Register(RegisterDTO registerDTO)
        {
            var register = await _accountService.Register(registerDTO);

            return Ok(register);
        }

        [HttpPost("update-password")]
        public async Task<ActionResult> UpdatePassword(UpdatePasswordDTO updatePassword)
        {
            await _accountService.UpdatePassword(updatePassword.OldPassword, 
                updatePassword.NewPassword, GetEmail());

            return Ok();
        }

        [HttpPost("update-email")]
        public async Task<ActionResult> UpdateEmail(UpdateEmailDTO updateEmail)
        {
            await _accountService.UpdateEmail(updateEmail.Email, updateEmail.Token, GetEmail());

            return Ok();
        }

        [HttpPost("update-photo")]
        public async Task<ActionResult> UpdatePhoto([FromForm]PhotoToUpdateDTO photo)
        {
            await _accountService.UpdatePhoto(photo, GetEmail());

            return Ok();
        }

        private string GetEmail()
        {
            return HttpContext.User.RetrieveEmailFromPrincipal();
        }
    }
}
