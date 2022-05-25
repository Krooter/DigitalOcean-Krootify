using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Dal.EntityConfiguration
{
    public class SongConfiguration : IEntityTypeConfiguration<Song>
    {
        public void Configure(EntityTypeBuilder<Song> builder)
        {
            builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
            builder.Property(x => x.PhotoUrl).HasDefaultValue("https://www.afrocharts.com/images/song_cover.png");
            builder.Property(x => x.Duration).IsRequired();
            builder.HasIndex(x => x.SongUrl).IsUnique();
        }
    }
}
