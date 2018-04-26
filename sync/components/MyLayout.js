import Header from './Header';
import Head from 'next/head';
import css from 'styled-jsx/css'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';


const Layout = props => (
  <div>
    <style>{`
      body {
        background: grey;
        position: absolute;
        width: 100%;
        height: 100%;
        filter: url("data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%2…%3C%2FfeComponentTransfer%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3C%2Fsvg%3E#blur");
        
      }
      div {
        color: #333;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 15px;
      }
    `}</style>

    
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
       
        <Header />
     
    </MuiThemeProvider>
    <div>
      {props.children}
    </div>
  </div>
);

export default Layout;
