using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Dal.EntityConfiguration
{
    public class PlayListSongConfiguration : IEntityTypeConfiguration<PlayListSong>
    {
        public void Configure(EntityTypeBuilder<PlayListSong> builder)
        {
            builder.Property(x => x.DateAdded).HasDefaultValue(DateTime.UtcNow);
            builder.HasAlternateKey(x => new { x.PlayListId, x.SongId }).HasName("IX_UniqueSongInPlayList");
        }
    }
}
