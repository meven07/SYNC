using System.Collections.Generic;

namespace Tracks.Model
{
    public class TrackParam
    {
        public string Id { get; set; } = string.Empty;
        public ICollection<Song> tracks { get; set; } = new List<Song>();
        public int UserId { get; set; } = 0;
    }
}
