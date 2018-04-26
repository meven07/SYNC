using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

using Tracks.Interfaces;
using Tracks.Model;
using MongoDB.Bson;

namespace Tracks.Data
{
    public class TrackRepository : ITrackRepository
    {
        private readonly TrackContext _context = null;

        public TrackRepository(IOptions<Settings> settings)
        {
            _context = new TrackContext(settings);
        }

        public async Task<IEnumerable<Track>> GetAllTracks()
        {
            try
            {
                return await _context.Tracks.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        // query after internal or internal id
        //
        public async Task<Track> GetTrack(string id)
        {
            try
            {
                ObjectId internalId = GetInternalId(id);
                return await _context.Tracks
                                     .Find(favorite => favorite.Id == id || favorite.InternalId == internalId)
                                .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        private ObjectId GetInternalId(string id)
        {
            ObjectId internalId;
            if (!ObjectId.TryParse(id, out internalId))
                internalId = ObjectId.Empty;

            return internalId;
        }

        public async Task AddTrack(Track item)
        {
            try
            {
                await _context.Tracks.InsertOneAsync(item);
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        public async Task<bool> RemoveTrack(string id)
        {
            try
            {
                DeleteResult actionResult = await _context.Tracks.DeleteOneAsync(
                     Builders<Track>.Filter.Eq("Id", id));

                return actionResult.IsAcknowledged
                    && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        public async Task<bool> UpdateTrack(string id, Track item)
        {
            try
            {
                ReplaceOneResult actionResult = await _context.Tracks
                                                .ReplaceOneAsync(n => n.Id.Equals(id)
                                                                , item
                                                                , new UpdateOptions { IsUpsert = true });
                return actionResult.IsAcknowledged
                    && actionResult.ModifiedCount > 0;
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        // Demo function - full document update
        public async Task<bool> UpdateTrackDocument(string id, Track body)
        {
            var item = await GetTrack(id) ?? new Track();
            item.Tracks = body.Tracks;
            item.UpdatedOn = DateTime.Now;

            return await UpdateTrack(id, item);
        }

        public async Task<bool> RemoveAllTracks()
        {
            try
            {
                DeleteResult actionResult = await _context.Tracks.DeleteManyAsync(new BsonDocument());

                return actionResult.IsAcknowledged
                    && actionResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        // it creates a compound index (first using UserId, and then Body)
        // MongoDb automatically detects if the index already exists - in this case it just returns the index details
        public async Task<string> CreateIndex()
        {
            try
            {
                return await _context.Tracks.Indexes
                                           .CreateOneAsync(Builders<Track>
                                                                .IndexKeys
                                                                .Ascending(item => item.Id));
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }
    }
}
