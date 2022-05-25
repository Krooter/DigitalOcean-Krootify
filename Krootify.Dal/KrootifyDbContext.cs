using Domain;
using Domain.Auth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Dal
{
    public class KrootifyDbContext : IdentityDbContext<User>
    {
        public KrootifyDbContext(DbContextOptions<KrootifyDbContext> options) : base(options)
        {

        }

        public DbSet<Song> Songs { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<PlayList> PlayLists { get; set; }
        public DbSet<SongCategory> SongCategories { get; set; }
        public DbSet<SongGenre> SongGenres { get; set; }
        public DbSet<PlayListSong> PlayListSongs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
