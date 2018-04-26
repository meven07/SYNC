import Link from 'next/link';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { login } from '../actions/sessionActions';
import { mutePlayback, unmutePlayback } from '../actions/playbackActions';
import { ButtonStyle, ButtonDarkStyle } from './ButtonStyle';
import css from 'styled-jsx/css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const linkStyle = {
  lineHeight: '30px',
  marginRight: 15
};

const mainLinkStyle = {
  float: 'left',
  marginRight: '10px'
};

const headerStyle = {
  backgroundColor: '#0099cc',
  padding: '20px 40px'
};

const getNameFromUser = user => {
  return user.display_name || user.id;
};

const Header = ({ session, muted, mutePlayback, unmutePlayback, login }) => (
  <MuiThemeProvider>
  
  <div style={headerStyle}>
  
    <Link href="/">
      <a style={Object.assign({}, linkStyle, mainLinkStyle)}>
        <img src="/static/c-icon-128.png" height="30" />
      </a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}><FormattedMessage id="about" /></a>
      
    </Link>
    <span style={{textAlign : 'center'}}>SYNC</span>  
    
    
    {session.user
      ? <div className="media user-header">
          <style>{`
            .user-header {
              float: right;
              width: 150px;
            }
            .user-image {
              border-radius: 50%;
            }
            .user-name {
              line-height: 30px;
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
          `}</style>
          <div className="media__img">
            <img
              className="user-image"
              src={
                (session.user.images && session.user.images.length && session.user.images[0].url) ||
                  '/static/user-icon.png'
              }
              width="30"
              height="30"
              alt={getNameFromUser(session.user)}
            />
          </div>
          <div className="user-name media__bd">
            {getNameFromUser(session.user)}
          </div>
        </div>
      : <button className="btn btn--dark" style={{ float: 'right' }} onClick={login}>
          <style>{ButtonStyle}</style>
          <style>{ButtonDarkStyle}</style>
          <FormattedMessage id="login" />
        </button>}
    {session.user
      ? <div className="playback-control">
          <style>
            {ButtonStyle}
          </style>
          <style>
            {ButtonDarkStyle}
          </style>
          <style>{`
            .playback-control {
              float: right;
              width: 200px;
            }
          `}</style>
        </div>
      : null}
  </div>

  </MuiThemeProvider>
);

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login()),
  mutePlayback: () => dispatch(mutePlayback()),
  unmutePlayback: () => dispatch(unmutePlayback())
});

const mapStateToProps = state => ({
  session: state.session,
  muted: state.playback.muted
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
