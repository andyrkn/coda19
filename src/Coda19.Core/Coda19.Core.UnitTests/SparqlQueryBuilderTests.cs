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
                .AddOWidPrefixes()
                .IncludeLiteral(nameof(DayModel.NewCases))
                .IncludeLiteral(nameof(DayModel.TotalCases))
                .AddValuedLiteral(nameof(DayModel.Date), nameof(DayModel.Date), new DateTime(2020, 2, 25))
                .Build()
                .Query;

            result.Should().BeEquivalentTo("PREFIX date:<http://escape.velocity/date#>\r\nPREFIX loc:<http://escape.velocity/location#>\r\nPREFIX event:<http://escape.velocity/events#>\r\nSELECT ?any ?NewCases ?TotalCases\r\nWHERE {\r\n?any event:NewCases ?NewCases .\r\n?any event:TotalCases ?TotalCases .\r\n?any event:Date \"2020-02-25\"^^xsd:date .\r\n}\r\nLIMIT 100\r\nOFFSET 0");
        }

        [Fact]
        public async Task RunQuery()
        {
            var resultSet = await new SparqlQueryBuilder(OWIDConstants.EventsPrefix,"id")
                .AddOWidPrefixes()
                .IncludeLiteral(nameof(DayModel.NewCases))
                .IncludeLiteral(nameof(DayModel.TotalCases))
                .IncludeLiteral(nameof(DayModel.TotalCasesPerMillion))
                .AddValuedLiteral(nameof(DayModel.Date), nameof(DayModel.Date), new DateTime(2020, 2, 25))
                .Build()
                .Run<DayModel>();

            resultSet.Should().NotBe(null);
            resultSet.PageNumber.Should().Be(0);
            resultSet.PageSize.Should().Be(100);
            resultSet.Count.Should().Be(42);
            resultSet.Records.Count().Should().Be(42);
        }
    }
}
