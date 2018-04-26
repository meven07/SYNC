import Layout from '../components/MyLayout.js';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../store/store';
import PageWithIntl from '../components/PageWithIntl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const About = () => (
  <Layout>
    <style>
      {`
        p {
          margin: 1px;
          padding: 100px;
        }
      `}
    </style>
    <MuiThemeProvider>
      <Card>
        <p>
          The web application is a collaborative music player in which users with a Spotify premium Spotify account can login, join a music room and listen to the same music other users in the room are listening to. 
          The user would also have an option to contribute to the playlist. There is a concept of a queue where a user in the room can add tracks and it would be queued. 
          If many users like a track, they have an option to up-vote that track so that the track comes up faster. Users in the same room can also talk to each other via the group chat feature. 
          A user can also save a track he likes in his/her favorites list and this list can be retrieved from any user session and across any room.
        </p>
        </Card>
    </MuiThemeProvider>
  </Layout>
);

export default withRedux(initStore, null, null)(PageWithIntl(About));
