using System;
using System.Linq;
using System.Threading.Tasks;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using FluentAssertions;
using Xunit;

namespace Coda19.Core.UnitTests
{
    public class SparqlQueryBuilderTests
    {
        [Fact]
        public void BuildQuery_WithDate()
        {
            var result = new SparqlQueryBuilder(OWIDConstants.EventsPrefix)
                .AddDefaultSubject()
                .UseDefaultSubject()
                .AddOWidPrefixes()
                .AddLiteral(nameof(DayModel.NewCases))
                .AddLiteral(nameof(DayModel.TotalCases))
                .AddValuedLiteral(nameof(DayModel.Date), nameof(DayModel.Date), new DateTime(2020, 2, 25))
                .Build()
                .Query;

            result.Should().BeEquivalentTo("PREFIX date:<http://escape.velocity/date#>\r\nPREFIX loc:<http://escape.velocity/location#>\r\nPREFIX event:<http://escape.velocity/events#>\r\nSELECT ?any ?NewCases ?TotalCases\r\nWHERE {\r\n?any event:NewCases ?NewCases .\r\n?any event:TotalCases ?TotalCases .\r\n?any event:Date \"2020-02-25\"^^xsd:date .\r\n}\r\nLIMIT 100\r\nOFFSET 0");
        }

        [Fact]
        public void SumOfCases_SinceDate_GroupByLocation()
        {
            var result = new SparqlQueryBuilder(OWIDConstants.EventsPrefix)
                .AddOWidPrefixes()
                .AddSubject(nameof(CountryModel.Location))
                .UseDefaultSubject()
                .Sum(nameof(DayModel.NewCases))
                .UseLiteral(nameof(DayModel.Date))
                .AddLink(OWIDConstants.LocationLink, OWIDConstants.LocationPrefix, nameof(CountryModel.Continent), nameof(CountryModel.Continent))
                .AddLink(OWIDConstants.LocationLink, OWIDConstants.LocationPrefix, nameof(CountryModel.Location), nameof(CountryModel.Location))
                .FilterGreaterThan(nameof(DayModel.Date), new DateTime(2020, 2, 25))
                .OrderBy(nameof(DayModel.NewCases), true)
                .GroupBy(nameof(CountryModel.Location))
                .Build()
                .Query;

            result.Should().BeEquivalentTo("PREFIX date:<http://escape.velocity/date#>\r\nPREFIX loc:<http://escape.velocity/location#>\r\nPREFIX event:<http://escape.velocity/events#>\r\nSELECT ?Location (sum(?NewCases1) as ?NewCases)\r\nWHERE {\r\n?any event:NewCases ?NewCases1 .\r\n?any event:Date ?Date .\r\n?any event:LocationLink [loc:Continent ?Continent] .\r\n?any event:LocationLink [loc:Location ?Location] .\r\nFILTER (?Date > \"2020-02-25\"^^xsd:date) .\r\n}\r\nGROUP BY ?Location\r\nORDER BY DESC(?NewCases)\r\nLIMIT 100\r\nOFFSET 0");
        }

        [Fact]
        public async Task RunQuery()
        {
            var resultSet = await new SparqlQueryBuilder(OWIDConstants.EventsPrefix)
                .AddSubject("id")
                .UseSubject("id")
                .AddOWidPrefixes()
                .AddLiteral(nameof(DayModel.NewCases))
                .AddLiteral(nameof(DayModel.TotalCases))
                .AddLiteral(nameof(DayModel.TotalCasesPerMillion))
                .AddValuedLiteral(nameof(DayModel.Date), nameof(DayModel.Date), new DateTime(2020, 2, 25))
                .Build()
                .Run<DayModel>();

            resultSet.Should().NotBe(null);
            resultSet.PageNumber.Should().Be(0);
            resultSet.PageSize.Should().Be(100);
            resultSet.Count.Should().Be(42);
            resultSet.Records.Count().Should().BeGreaterOrEqualTo(42);
        }
    }
}
