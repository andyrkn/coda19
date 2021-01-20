using System;

namespace Coda19.Reader
{
    public static class OWIDConstants
    {
        public const string RepoId = "owid";

        public static readonly Uri EventsUri = new Uri("http://escape.velocity/events#");
        public static readonly Uri LocationUri = new Uri("http://escape.velocity/location#");
        public static readonly Uri DateUri = new Uri("http://escape.velocity/date#");

        public const string EventsPrefix = "event";
        public const string LocationPrefix = "loc";
        public const string DatePrefix = "date";
    }
}