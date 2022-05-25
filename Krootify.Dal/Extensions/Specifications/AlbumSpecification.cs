
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Dal.Extensions.Specifications
{
    public class AlbumSpecification : BaseSpecification<Album>
    {
        public AlbumSpecification(ParamsSpecification paramsSpec) : base(x =>
             string.IsNullOrEmpty(paramsSpec.Search) || x.Name.ToLower().Contains(paramsSpec.Search.ToLower()))
        {
            AddInclude(q => q.Include(x => x.Songs));
            AddOrderBy(x => x.Name);
            ApplyPagging(paramsSpec.PageSize * (paramsSpec.PageIndex), paramsSpec.PageSize);

            if (!string.IsNullOrEmpty(paramsSpec.Sort))
            {
                switch (paramsSpec.Sort)
                {
                    case "albumAsc":
                        AddOrderBy(p => p.Name);
                        break;
                    case "albumDesc":
                        AddOrderByDescending(p => p.Name);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public AlbumSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(q => q.Include(x => x.Songs).ThenInclude(x => x.Artists)
                .Include(x => x.Songs).ThenInclude(x => x.SongGenres)
                .Include(x => x.Songs).ThenInclude(x => x.SongCategories));
        }
    }
}
