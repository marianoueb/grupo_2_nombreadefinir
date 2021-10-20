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

class LastUploaded extends Component {

    constructor(){
        super();
        this.state = {
            products: [],
        }
    }

    componentDidMount(){
        fetch("http://localhost:3001/api/products/last")
            .then(respuesta => { 
                return respuesta.json() 
            })
            .then(resp => { 
                this.setState({
                    products: resp.data
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
                                <h3><strong>Últimos productos</strong></h3>
                            </ListSubheader>
                        }
                        >
                        { this.state.products.map(product => 
                        <Link to={"/products/"+product.id} className="main-link" exact="true">
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar src={product.image} alt="avatar" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={product.name}
                                    secondary={product.brand}
                                />
                                <IconButton edge="end" aria-label="">
                                    <div>
                                        <h5>ID</h5>
                                        <p>{product.id}</p>
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

export default LastUploaded 