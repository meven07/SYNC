using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Tracks.Model;

namespace Tracks.Data
{
    public class TrackContext
    {
        private readonly IMongoDatabase _database = null;

        public TrackContext(IOptions<Settings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<Track> Tracks
        {
            get
            {
                return _database.GetCollection<Track>("Track");
            }
        }
    }
}
