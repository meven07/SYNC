using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

using Tracks.Interfaces;
using Tracks.Model;

namespace Tracks.Controllers
{
    [Route("api/[controller]")]
    public class SystemController : Controller
    {
        private readonly ITrackRepository _trackRepository;

        public SystemController(ITrackRepository trackRepository)
        {
            _trackRepository = trackRepository;
        }

        // Call an initialization - api/system/init
        [HttpGet("{setting}")]
        public string Get(string setting)
        {
            if (setting == "init")
            {
                _trackRepository.RemoveAllTracks();
                var name = _trackRepository.CreateIndex();

                //Add Track names
                Song track1 = new Song{Title = "Sweet Child of Mine"};
                Song track2 = new Song { Title = "Hotel California"};
                List<Song> tracks = new List<Song>();
                tracks.Add(track1);
                tracks.Add(track2);

                _trackRepository.AddTrack(new Track() { Id = "Meven", Tracks = tracks, CreatedOn = DateTime.Now, UpdatedOn = DateTime.Now });
                _trackRepository.AddTrack(new Track() { Id = "Ravi", Tracks = tracks, CreatedOn = DateTime.Now, UpdatedOn = DateTime.Now });
                _trackRepository.AddTrack(new Track() { Id = "Jerin", Tracks = tracks, CreatedOn = DateTime.Now, UpdatedOn = DateTime.Now });
                _trackRepository.AddTrack(new Track() { Id = "Hemant", Tracks = tracks, CreatedOn = DateTime.Now, UpdatedOn = DateTime.Now });

                return "Database TracksDb was created, and collection 'Tracks' was filled with 4 sample items";
            }

            return "Unknown";
        }
    }
}
