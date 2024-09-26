import React, { Component, Fragment } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';

import {Link} from 'react-router-dom'


class MostBuyers extends Component {

    constructor(){
        super();
        this.state = {
            users: [],
        }
    }

    componentDidMount(){
        fetch("http://localhost:3001/api/users/sales")
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
                                <h3><strong>Usuarios mas compradores</strong></h3>
                            </ListSubheader>
                        }
                        >
                        { this.state.users.map((user, index) => 
                            <Link to={"/users/"+user.id} className="main-link" exact="true">
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar src={user.avatar} alt="avatar" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.name}
                                        secondary={user.email + " (ID:" + user.id + ")"}
                                    />
                                    <IconButton edge="end" aria-label="">
                                        <div>
                                            <h5>Compras</h5>
                                            <p>{user.cartCount}</p>
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

export default MostBuyers