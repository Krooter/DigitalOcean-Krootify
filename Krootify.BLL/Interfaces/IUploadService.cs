using System.IO;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IUploadService
    {
        Task<string> UploadAsync(Stream fileStream, string fileName, string contentType);
        Task DeleteSongAsync(string fileName);
        Task DeletePhotoAsync(string fileName);
    }
}
