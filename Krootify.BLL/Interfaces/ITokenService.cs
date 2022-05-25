using Domain.Auth;

namespace BLL.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user, string role);
    }
}
