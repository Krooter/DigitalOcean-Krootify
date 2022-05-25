using Common.DTOs.Song;
using Common.DTOs.User;
using Domain.Auth;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IAccountService
    {
        Task<UserForLoginDTO> GetCurrentUser(string email);
        Task<bool> CheckEmailExists(string email);
        Task<UserForLoginDTO> Login(LoginDTO loginDTO);
        Task<UserForLoginDTO> Register(RegisterDTO registerDTO);
        Task<UserForLoginDTO> UpdatePassword(string oldPassword, string newPassword, string email);
        Task<UserForLoginDTO> UpdateEmail(string email, string token, string currentEmail);
        Task UpdatePhoto(PhotoToUpdateDTO photoToUpdate, string email);
    }
}
