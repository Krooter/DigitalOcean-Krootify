using Domain;
using Microsoft.EntityFrameworkCore;

namespace Dal.Extensions.Specifications
{
    public class ArtistSpecification : BaseSpecification<Artist>
    {
        public ArtistSpecification(ParamsSpecification paramsSpec) : base(x =>
            (string.IsNullOrEmpty(paramsSpec.Search) || x.SceneName.ToLower().Contains(paramsSpec.Search.ToLower()) 
            || x.FirstName.ToLower().Contains(paramsSpec.Search.ToLower()) || x.LastName.ToLower().Contains(paramsSpec.Search.ToLower())))
        {
            AddInclude(q => q.Include(x => x.Songs));
            AddOrderBy(x => x.LastName);
            ApplyPagging(paramsSpec.PageSize * (paramsSpec.PageIndex), paramsSpec.PageSize);

            if (!string.IsNullOrEmpty(paramsSpec.Sort))
            {
                switch (paramsSpec.Sort)
                {
                    case "nameAsc":
                        AddOrderBy(p => p.LastName);
                        break;
                    case "nameDesc":
                        AddOrderByDescending(p => p.LastName);
                        break;
                    default:
                        AddOrderBy(n => n.LastName);
                        break;
                }
            }
        }
        public ArtistSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(q => q.Include(x => x.Songs).ThenInclude(x => x.Albums)
                .Include(x => x.Songs).ThenInclude(x => x.SongGenres)
                .Include(x => x.Songs).ThenInclude(x => x.SongCategories));
        }
    }
}
