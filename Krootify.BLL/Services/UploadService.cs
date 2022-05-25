using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using BLL.Interfaces;
using Dal.Constants;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class UploadService : IUploadService
    {
        private readonly string _storageConnectionString;

        public UploadService(IConfiguration configuration)
        {
            _storageConnectionString = configuration["AzureStorage:Key"];
        }

        public async Task DeletePhotoAsync(string fileName)
        {
            var container = new BlobContainerClient(_storageConnectionString, ApplicationConstants.PhotosBlob);

            var blob = container.GetBlobClient(fileName);

            await blob.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);
        }

        public async Task DeleteSongAsync(string fileName)
        {
            var container = new BlobContainerClient(_storageConnectionString, ApplicationConstants.SongsBlob);

            var blob = container.GetBlobClient(fileName);

            await blob.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);
        }

        public async Task<string> UploadAsync(Stream fileStream, string fileName, string contentType)
        {
            BlobContainerClient container = null;

            if (ApplicationConstants.AllowedImages.Contains(contentType))
            {
                container = new BlobContainerClient(_storageConnectionString, ApplicationConstants.PhotosBlob);
            }

            if (ApplicationConstants.AllowedAudio.Contains(contentType))
            {
                container = new BlobContainerClient(_storageConnectionString, ApplicationConstants.SongsBlob);
            }

            if (ApplicationConstants.AllowedAudio.Concat(ApplicationConstants.AllowedImages).Contains(contentType) == false)
            {
                throw new System.Exception("Unsuported media format!");
            }
            
            var createResponse = await container.CreateIfNotExistsAsync();

            if (createResponse != null && createResponse.GetRawResponse().Status == 201)
            {
                await container.SetAccessPolicyAsync(PublicAccessType.Blob);
            }

            var blob = container.GetBlobClient(fileName);

            await blob.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);

            await blob.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = contentType, CacheControl = "3600" });

            return blob.Uri.ToString();
        }
    }
}
