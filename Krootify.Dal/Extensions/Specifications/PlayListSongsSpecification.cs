using Domain;

namespace Dal.Extensions.Specifications
{
    public class PlayListSongsSpecification : BaseSpecification<PlayListSong>
    {
        public PlayListSongsSpecification(int playListId, int songId) : base(x => x.PlayLists.Id == playListId && x.Songs.Id == songId)
        {

        }

        public PlayListSongsSpecification(int playListId, ParamsSpecification paramsSpec) : base(x => x.PlayListId == playListId)
        {
            AddOrderByDescending(x => x.Songs.Id);
        }
    }
}
