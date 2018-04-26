using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tracks.Interfaces;
using Tracks.Model;
using Tracks.Infrastructure;
using System;
using System.Collections.Generic;

namespace Tracks.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TracksController : Controller
    {
        private readonly ITrackRepository _trackRepository;

        public TracksController(ITrackRepository trackRepository)
        {
            _trackRepository = trackRepository;
        }

        [NoCache]
        [HttpGet]
        public async Task<IEnumerable<Track>> Get()
        {
            return await _trackRepository.GetAllTracks();
        }

        // GET api/tracks/5
        [HttpGet("{id}")]
        public async Task<Track> Get(string id)
        {
            return await _trackRepository.GetTrack(id) ?? new Track();
        }

        // POST api/tracks
        [HttpPost]
        public void Post([FromBody] TrackParam newTrack)
        {
            _trackRepository.AddTrack(new Track
                                        {
                                            Id = newTrack.Id,
                                            Tracks = newTrack.tracks,
                                            CreatedOn = DateTime.Now,
                                            UpdatedOn = DateTime.Now
                                        });
        }

        // PUT api/tracks/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody]Track value)
        {
            _trackRepository.UpdateTrackDocument(id, value);
        }

        // DELETE api/tracks/23243423
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _trackRepository.RemoveTrack(id);
        }
    }
}
