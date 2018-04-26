using System.Collections.Generic;
using System.Threading.Tasks;
using Tracks.Model;

namespace Tracks.Interfaces
{
    public interface ITrackRepository
    {
        Task<IEnumerable<Track>> GetAllTracks();
        Task<Track> GetTrack(string id);

        // add new document
        Task AddTrack(Track item);

        // remove a single document 
        Task<bool> RemoveTrack(string id);

        // demo interface - full document update
        Task<bool> UpdateTrackDocument(string id, Track body);

        // should be used with high cautious, only in relation with demo setup
        Task<bool> RemoveAllTracks();

        // creates a sample index
        Task<string> CreateIndex();
    }
}
