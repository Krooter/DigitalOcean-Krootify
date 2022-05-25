
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dal.EntityConfiguration
{
    public class ArtistConfiguration : IEntityTypeConfiguration<Artist>
    {
        public void Configure(EntityTypeBuilder<Artist> builder)
        {
            builder.Property(x => x.LastName).HasMaxLength(50).IsRequired();
            builder.Property(x => x.FirstName).HasMaxLength(50).IsRequired();
        }
    }
}
