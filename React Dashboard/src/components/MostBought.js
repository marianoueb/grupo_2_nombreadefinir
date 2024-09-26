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


class MostBought extends Component {

    constructor(){
        super();
        this.state = {
            products: [],
        }
    }

    componentDidMount(){
        fetch("http://localhost:3001/api/products/most")
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
                                <h3><strong>Productos mas comprados</strong></h3>
                            </ListSubheader>
                        }
                        >
                        { this.state.products.map((product, index) => 
                            <Link to={"/products/"+product.product_id} className="main-link" exact="true">
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar src={product.image} alt="avatar" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={product.product}
                                        secondary={product.brand + " (ID:" + product.product_id + ")"}
                                    />
                                    <IconButton edge="end" aria-label="">
                                        <div>
                                            <h5>Compras</h5>
                                            <p>{product.times}</p>
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

export default MostBought 