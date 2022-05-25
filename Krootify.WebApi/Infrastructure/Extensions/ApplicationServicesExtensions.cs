using BLL;
using BLL.Interfaces;
using BLL.Services;
using Dal.Interfaces;
using Dal.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace WebApi.Infrastructure.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<ISongService, SongService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPlayListService, PlayListService>();
            services.AddScoped<IUploadService, UploadService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IArtistService, ArtistService>();
            services.AddScoped<IAlbumService, AlbumService>();
            services.AddScoped<IStripeSubscriptionService, StripeSubscriptionService>();

            services.AddAutoMapper(typeof(BLLAssemblyMarker));

            return services;
        }
    }
}
