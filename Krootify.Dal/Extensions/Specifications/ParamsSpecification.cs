
namespace Dal.Extensions.Specifications
{
    public class ParamsSpecification
    {
        private const int MaxPageSize = 25;
        public int PageIndex { get; set; } = 0;
        private int _pageSize = 10;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int? Category { get; set; }
        public int? Genre { get; set; }
        public string Sort { get; set; }
        public string Search { get; set; }
    }
}
