import React, { Component, Fragment } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';

import { Link } from "react-router-dom"

class LastRegistered extends Component {

    constructor(){
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        
        fetch("http://localhost:3001/api/users/last")
            .then(respuesta => { 
                return respuesta.json() 
            })
            .then(resp => { 
                this.setState({
                    users: resp.data
                }) 
            })
            .catch(error => console.log(error))

        
    }

    render(){
        return (
            <Fragment>
                
                <Paper elevation={3} square>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                <h3><strong>Últimos registros</strong></h3>
                            </ListSubheader>
                        }
                        >
                        { this.state.users.map(user => 
                        <Link to={"/users/"+user.id} className="main-link" exact="true">
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar src={user.avatar} alt="avatar" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.name + " " + user.surname}
                                    secondary={user.email}
                                />
                                <IconButton edge="end" aria-label="">
                                    <div>
                                        <h1>ID</h1>
                                        <p>{user.id}</p>
                                    </div>
                                </IconButton>
                            </ListItemButton>
                        </Link>
                        )}
                    </List>
                </Paper>
                
            </Fragment>
        )
    }
}

export default LastRegistered 