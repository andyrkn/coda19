using System.Collections.Generic;

namespace Coda19.Core.OWID
{
    public sealed class CountryModel
    {
        public string Continent { get; set; }
        public string Location { get; set; }
        public long Population { get; set; }
        
        public decimal? PopulationDensity { get; set; }
        
        public decimal? Over65 { get; set; }
        
        public decimal? Over70 { get; set; }
        
        public decimal? FemaleSmokers { get; set; }
        
        public decimal? MaleSmokers { get; set; }
        
        public decimal? HospitalBedsPerThousand { get; set; }
        
        public decimal? LifeExpectancy { get; set; }
        
        public decimal? DevelopmentIndex { get; set; }

        public IList<DayModel> Data;
    }

    public sealed class DayModel
    {
        public string Id { get; set; }

        public string Date { get; set; }
        
        public long? TotalCases { get; set; }
        
        public long? NewCases { get; set; }
        
        public decimal? TotalCasesPerMillion { get; set; }
        
        public decimal? StringencyIndex { get; set; }
        
        public long? NewTests { get; set; }
        
        public long? TotalTests { get; set; }
        
        public long? NewDeaths { get; set; }
        
        public long? TotalDeaths { get; set; }
    }
}