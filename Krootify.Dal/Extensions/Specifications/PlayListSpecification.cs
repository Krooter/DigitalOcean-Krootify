using Domain;
using Microsoft.EntityFrameworkCore;

namespace Dal.Extensions.Specifications
{
    public class PlayListSpecification : BaseSpecification<PlayList>
    {
        public PlayListSpecification(ParamsSpecification spec, string userId) : base(x => x.UserId == userId)
        {
            AddInclude(q => q.Include(x => x.User));
            AddInclude(q => q
                .Include(x => x.Songs).ThenInclude(x => x.Songs).ThenInclude(x => x.Albums)
                .Include(x => x.Songs).ThenInclude(x => x.Songs).ThenInclude(x => x.Artists));
        }

        public PlayListSpecification(int id, string userId) : base(x => x.UserId == userId && x.Id == id)
        {
            AddInclude(q => q.Include(x => x.User));
            AddInclude(q => q
                .Include(x => x.Songs).ThenInclude(x => x.Songs).ThenInclude(x => x.Albums)
                .Include(x => x.Songs).ThenInclude(x => x.Songs).ThenInclude(x => x.Artists));
        }
    }
}
