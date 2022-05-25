using Domain;
using Microsoft.EntityFrameworkCore;

namespace Dal.Extensions.Specifications
{
    public class SongSpecification : BaseSpecification<Song>
    {
        public SongSpecification(ParamsSpecification paramsSpec) : base(x => 
            (string.IsNullOrEmpty(paramsSpec.Search) || x.Name.ToLower().Contains(paramsSpec.Search.ToLower())) &&
            (!paramsSpec.Category.HasValue || x.SongCategoryId == paramsSpec.Category) &&
            (!paramsSpec.Genre.HasValue || x.SongGenreId == paramsSpec.Genre))
        {
            AddInclude(q => q.Include(e => e.Albums));
            AddInclude(q => q.Include(e => e.Artists));
            AddInclude(q => q.Include(e => e.SongCategories));
            AddInclude(q => q.Include(e => e.SongGenres));
            AddOrderBy(x => x.Name);
            ApplyPagging(paramsSpec.PageSize * paramsSpec.PageIndex, paramsSpec.PageSize);

            if (!string.IsNullOrEmpty(paramsSpec.Sort))
            {
                switch (paramsSpec.Sort)
                {
                    case "nameDesc":
                        AddOrderByDescending(p => p.Name);
                        break;
                    case "durationAsc":
                        AddOrderBy(p => p.Duration);
                        break;
                    case "durationDesc":
                        AddOrderByDescending(p => p.Duration);
                        break;
                    case "albumAsc":
                        AddOrderBy(p => p.Albums.Name);
                        break;
                    case "albumDesc":
                        AddOrderByDescending(p => p.Albums.Name);
                        break;
                    case "listenersAsc":
                        AddOrderBy(p => p.Listeners);
                        break;
                    case "listenersDesc":
                        AddOrderByDescending(p => p.Listeners);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public SongSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(q => q.Include(e => e.Albums));
            AddInclude(q => q.Include(e => e.Artists));
            AddInclude(q => q.Include(e => e.SongCategories));
            AddInclude(q => q.Include(e => e.SongGenres));
        }

        public SongSpecification(string url) : base(x => x.SongUrl == url)
        {
            AddInclude(q => q.Include(e => e.Albums));
            AddInclude(q => q.Include(e => e.Artists));
            AddInclude(q => q.Include(e => e.SongCategories));
            AddInclude(q => q.Include(e => e.SongGenres));
        }
    }
}
