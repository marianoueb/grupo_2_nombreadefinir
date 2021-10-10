import React, { Component, Fragment } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';

class BrandProducts extends Component {

    constructor(){
        super();
        this.state = {
            brands: []
        }
    }

    componentDidMount(){
        fetch("http://localhost:3001/api/brands/most")
            .then(respuesta => { 
                return respuesta.json() 
            })
            .then(resp => { 
                this.setState({
                    brands: resp.data
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
                                <h3><strong>Marcas con mas productos</strong></h3>
                            </ListSubheader>
                        }
                        >
                        { this.state.brands.map(brand => 
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar src={brand.logo} alt="avatar" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={brand.brand}
                                    secondary={"ID: " + brand.id}
                                />
                                <IconButton edge="end" aria-label="">
                                    <div>
                                        <h5>Productos</h5>
                                        <p>{brand.count}</p>
                                    </div>
                                </IconButton>
                            </ListItemButton>
                        )}
                    </List>
                </Paper>
            </Fragment>
        )
    }
}

export default BrandProducts 