import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { ButtonStyle, ButtonDarkStyle } from './ButtonStyle';
import { fetchAvailableDevices, transferPlaybackToDevice } from '../actions/devicesActions';
import { getIsFetchingDevices } from '../reducers';
import { getDevices } from '../reducers';
import css from 'styled-jsx/css'
import RaisedButton from 'material-ui/RaisedButton'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


class Devices extends React.PureComponent {
  render() {
    const { devices, isFetching, fetchAvailableDevices, transferPlaybackToDevice } = this.props;
    return (
      <MuiThemeProvider>
      <Card>
      <div style={{ paddingBottom: '10px' , backgroundColor:'#0099cc'}}>
        <center><h2><FormattedMessage id="devices.title" /></h2></center> 
        <style>
          {ButtonStyle}
        </style>
        <style>
          {ButtonDarkStyle}
        </style>
        <button
          className="btn btn--dark"
          disabled={isFetching}
          onClick={() => {
            fetchAvailableDevices();
          }}
        >
          <FormattedMessage id="devices.fetch" />
        </button>
        
        {devices.length === 0
          ? <p><FormattedMessage id="devices.empty" /></p>
          : <table>
              <tbody>
                {devices.map(device => (
                  <tr>
                    <td>
                      {device.is_active
                        ? <strong>Active -&gt;</strong>
                        : <button
                            onClick={() => {
                              transferPlaybackToDevice(device.id);
                            }}
                          >
                            <FormattedMessage id="devices.transfer" />
                          </button>}
                    </td>
                    <td>
                      {device.name}
                    </td>
                    <td>
                      {device.type}
                    </td>
                    <td>
                      {device.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}
      </div>
      </Card>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAvailableDevices: index => dispatch(fetchAvailableDevices(index)),
  transferPlaybackToDevice: deviceId => dispatch(transferPlaybackToDevice(deviceId))
});

const mapStateToProps = state => ({
  isFetching: getIsFetchingDevices(state),
  devices: getDevices(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
