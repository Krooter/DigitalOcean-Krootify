using Domain.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = Role.User + "," + Role.Admin)]
    public class BaseApiController : ControllerBase
    {
    }
}
