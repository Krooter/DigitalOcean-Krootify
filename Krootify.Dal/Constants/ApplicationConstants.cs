
using System.Collections.Immutable;

namespace Dal.Constants
{
    public static class ApplicationConstants
    {
        public static readonly ImmutableArray<string> AllowedImages =
            ImmutableArray.Create("image/png", "image/jpeg");

        public static readonly ImmutableArray<string> AllowedAudio =
            ImmutableArray.Create("audio/mpeg");

        public static readonly string PhotosBlob = "photos";

        public static readonly string SongsBlob = "songs";

        public static readonly string UrlPhotoBlob = @"https://krootify.blob.core.windows.net/" + PhotosBlob + "/";

        public static readonly string UrlSongsBlob = @"https://krootify.blob.core.windows.net/" + SongsBlob + "/";

        public static readonly string UrlDefaultUserPhoto = @"https://krootify.blob.core.windows.net/photos/default-user.jpg";

        public static readonly ImmutableArray<string> PlanNames = ImmutableArray.Create("Krootify Premium Yearly", "Krootify Premium Monthly");
    }
}
