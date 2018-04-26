import React from 'react';
import css from 'styled-jsx/css'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Script from 'react-load-script';
import Iframe from 'react-iframe';
import io from "socket.io-client";

class NowPlaying extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      deviceId: "",
      loggedIn: false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 0,
      start: Date.now(),
      currentPosition: 0
    };
    this.timer = null;
    this.tick = () => {
      this.setState({
        currentPosition: Date.now() - this.state.start + (this.props.position || 0)
      });
    };
    /* create the variable */
    this.playerCheckInterval = null;

  }

 // returns a new token or the cached one if still valid
getToken = callback => {
  if (accessToken !== null) {
    callback && callback(accessToken);
  } else {
    fetchNewToken(callback);
  }
};
  
  handleScriptLoad = () => {
    return new Promise(resolve => {
      if (window.Spotify) {
        resolve();
      } else {
        //window.onSpotifyWebPlaybackSDKReady = resolve;
      }
    });
  }

  checkForPlayer() {
   
    const { token } = this.state;
    //if (window.Spotify !== null) {
      clearInterval(this.playerCheckInterval);

      this.player = new window.Spotify.Player({
        name: "Meven's Spotify Player",
        getOAuthToken: cb => { cb(token); },
      });
     
      this.createEventHandlers();
  
      // finally, connect!
      this.player.connect();
    //}
  }

  createEventHandlers() {
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on('account_error', e => { console.error(e); });
    this.player.on('playback_error', e => { console.error(e); });
  
    // Playback status updates
    this.player.on('player_state_changed', state => this.onStateChanged(state));
  
    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      this.setState({ deviceId: device_id });
      this.transferPlaybackHere();
    });

  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      });
    }
  }

  transferPlaybackHere() {
    const { deviceId, token } = this.state;
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ deviceId ],
        "play": true,
      }),
    });
  }

  componentWillReceiveProps(props) {
    if (this.props.position !== props.position || this.props.track !== props.track) {
      this.setState({
        start: Date.now(),
        currentPosition: 0
      });
    }
  }
  componentDidMount() {
    this.timer = setInterval(this.tick, 300);
  }
  
  componentWillUnmount() {
    clearInterval(this.timer);
    
    //Added to avoid client side rendering
    this.checkForPlayer();
  }
  

  render() {
    const percentage = +(this.state.currentPosition * 100 / this.props.track.duration_ms).toFixed(2) + '%';
    const userName = this.props.user.display_name || this.props.user.id;
    <Script 
      url="https://sdk.scdn.co/spotify-player.js" 
      onError={this.handleScriptError} 
      onLoad={this.handleScriptLoad}
    />
    return (

      <div className="now-playing">
        <style>{`
          .now-playing {
            background-color: #424d58;
            color: #fff;
            height: 250px;
            position: relative;
            width: 100%;
          }
          .now-playing__text {
            padding: 40px;
          }
          .now-playing__bd {
            padding-left: 30px;
          }
          .now-playing__track-name {
            font-size: 2em;
            padding-top: 1.2em;
          }
          .now-playing__artist-name {
            font-size: 1.2em;
            padding-bottom: 2em;
            padding-top: 0.5em;
          }
          .now-playing__user {
            padding-top: 0.5em;
          }
          .now-playing__progress_bar {
            bottom: 0;
            background-color: #222;
            height: 5px;
            position: absolute;
            width: 100%;
          }
          .media,
          .media__bd {
            overflow: hidden;
            _overflow: visible;
            zoom: 1;
          }
          .media .media__img {
            float: left;
            margin-right: 10px;
          }
          .user-image {
            border-radius: 50%;
          }
          .user-name {
            line-height: 30px;
          }
        `}</style>
        <div className="now-playing__text media">
          <div className="media__img">
            <img src={this.props.track.album.images[1].url} width="170" height="170" />
          </div>
          <div className="now-playing__bd media__bd">
            <div className="now-playing__track-name">
              {this.props.track.name}
            </div>
            <div className="now-playing__artist-name">
              {this.props.track.artists.map(a => a.name).join(', ')}
            </div>
            <div className="media__img">
              <img
                className="user-image"
                src={
                  (this.props.user.images && this.props.user.images.length && this.props.user.images[0].url) ||
                    '/static/user-icon.png'
                }
                width="30"
                height="30"
                alt={userName}
                title={userName}
              />
            </div>
            <div className="user-name media__bd">
              {userName}
            </div>
          </div>
        </div>
        <div className="now-playing__progress">
          <div className="now-playing__progress_bar" style={{ width: percentage }} />
        </div>
      </div>
      
    );
  }
}

export default NowPlaying;
