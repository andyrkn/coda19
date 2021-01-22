namespace Coda19.Evolution.Business
{
    public abstract class GetFilterModel
    {
        public int PageIndex { get; set; } = 0;
        public int PageSize { get; set; } = 50;
    }
}