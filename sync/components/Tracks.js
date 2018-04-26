import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

const urlForUsername = username =>
  `http://localhost:5000/api/tracks/`+username;

class GitHub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false
    }
  }

  componentDidMount() {

        fetch(urlForUsername(this.props.items.display_name))
        .then(response => {
            if (!response.ok) {
            throw Error("Network request failed")
            }

            return response
        })
        .then(d => d.json())
        .then(d => {
            this.setState({
            githubData: d
            })
        }, () => {
            this.setState({
            requestFailed: true
            })
        })

      //Added to save the playing track to the user's favourite playlist
      this.saveTrack = ev => {

        fetch(urlForUsername(this.props.items.display_name))
        .then(response => {
          if (!response.ok) {
            throw Error("Network request failed")
          }
  
          return response
        })
        .then(d => d.json())
        .then(d => {
          
            var updatedTracks = d.tracks.concat({title:this.props.track.name})
            
            fetch('http://localhost:5000/api/tracks/'+this.props.items.display_name, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                body:JSON.stringify({id:this.props.items.display_name, Tracks:updatedTracks})
            }).then((res) => res.json())
            .then((data) =>  
              
                //Added to reload the favourites playlist once the song is saved.
                //Added to save the playing track to the user's favourite playlist
                fetch(urlForUsername(this.props.items.display_name))
                    .then(response => {
                        if (!response.ok) {
                        throw Error("Network request failed")
                        }

                        return response
                    })
                    .then(d => d.json())
                    .then(d => {
                        this.setState({
                        githubData: d
                        })
                    }, () => {
                        this.setState({
                        requestFailed: true
                        })
                    })
            )
            .catch((err)=>console.log(err))
  
            this.setState({
                githubData: d
            })
        }, () => {
          this.setState({
            requestFailed: true
          })
        })
        
      }

      //Added to save the playing track to the user's favourite playlist
      this.getTracks = ev => {
            fetch(urlForUsername(this.props.items.display_name))
            .then(response => {
                if (!response.ok) {
                throw Error("Network request failed")
                }

                return response
            })
            .then(d => d.json())
            .then(d => {
                this.setState({
                githubData: d
                })
            }, () => {
                this.setState({
                requestFailed: true
                })
            })
      }
  }

  

  render() {

    if (this.state.requestFailed) return <p>Failed!</p>
    if (!this.state.githubData) return <p>Loading...</p>
    return (
        <MuiThemeProvider>
        <div className="container" style = {{width: 320 ,height: 300}}>
            
        <button onClick={this.saveTrack} style={{backgroundColor : 'white'}} className="btn btn-primary form-control">Save</button> &nbsp;&nbsp;
        <button onClick={this.getTracks} style={{backgroundColor : 'white'}} className="btn btn-primary form-control">Favourites</button>
        <br/><br/>
        {this.state.githubData.tracks !== null ? 
            <Table height='300px' fixedHeader='Tracks' >
                <TableHeader displaySelectAll={false}>
                <TableRow style={{backgroundColor:'#0099cc', color: 'white'}}>
                    <TableHeaderColumn key="tracks"><h2>Tracks</h2></TableHeaderColumn>
                </TableRow>
                </TableHeader>
                
                <TableBody displayRowCheckbox={false} >
                {this.state.githubData.tracks.map((row, i) =>
                    <TableRow key={i}>
                        <TableRowColumn style={{backgroundColor:'#0099cc', color: 'white'}} key={i}>{i+1}. {row.title}</TableRowColumn>
                    </TableRow>
                )}
                </TableBody>
          </Table>
        : null} 
        
       </div>
       </MuiThemeProvider>
      
    )
  }
}

export default GitHub;