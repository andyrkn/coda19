using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Coda19.Core.OWID
{
    public sealed class CountryReadModel
    {
        public string Continent { get; set; }
        public string Location { get; set; }
        public long Population { get; set; }

        [JsonProperty("population_density")]
        public decimal? PopulationDensity { get; set; }

        [JsonProperty("aged_65_older")]
        public decimal? Over65 { get; set; }

        [JsonProperty("aged_70_older")]
        public decimal? Over70 { get; set; }

        [JsonProperty("female_smokers")]
        public decimal? FemaleSmokers { get; set; }

        [JsonProperty("male_smokers")]
        public decimal? MaleSmokers { get; set; }

        [JsonProperty("hospital_beds_per_thousand")]
        public decimal? HospitalBedsPerThousand { get; set; }

        [JsonProperty("life_expectancy")]
        public decimal? LifeExpectancy { get; set; }

        [JsonProperty("human_development_index")]
        public decimal? DevelopmentIndex { get; set; }

        public IList<DayReadModel> Data;
    }

    public sealed class DayReadModel
    {
        public string Id = Guid.NewGuid().ToString("N");

        public string Date { get; set; }

        [JsonProperty("total_cases")]
        public long? TotalCases { get; set; }

        [JsonProperty("new_cases")]
        public long? NewCases { get; set; }

        [JsonProperty("total_cases_per_million")]
        public decimal? TotalCasesPerMillion { get; set; }

        [JsonProperty("stringency_index")]
        public decimal? StringencyIndex { get; set; }

        [JsonProperty("new_tests")]
        public long? NewTests { get; set; }

        [JsonProperty("total_tests")]
        public long? TotalTests { get; set; }

        [JsonProperty("new_deaths")]
        public long? NewDeaths { get; set; }

        [JsonProperty("total_deaths")]
        public long? TotalDeaths { get; set; }
    }
}