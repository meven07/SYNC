import React from "react";
import io from "socket.io-client";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: this.props.items.display_name,
            message: '',
            messages: []
        };

        this.socket = io('localhost:8080');
        
        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});
            

        }
    }

    render(){
        const { items } = this.props;
        //
        return (
            <MuiThemeProvider>
            <Card>
            <CardTitle title="Talk!" style={{backgroundColor:'#d9d9d9'}} />
            <div className="container" style={{backgroundColor:'#0099cc'}}>
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                            <CardText>
                                <TextField multiLine={true} rows={12} style = {{width: 320}}>
                                    <div className="messages">
                                        {this.state.messages.map(message => {
                                            return (
                                                <div>{message.author}: {message.message}</div>
                                            )
                                        })}
                                    </div>
                                </TextField>
                            </CardText>
                            </div>
                           
                            <CardActions>
                                <div className="card-footer">
                                <TextField type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}  style = {{width: 300}}/>
                                &nbsp;&nbsp;
                                
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                                </div>
                            </CardActions>
                            
                        </div>
                    </div>
                </div>
            </div>
            </Card>
            </MuiThemeProvider>
        );
    }
}

export default Chat;