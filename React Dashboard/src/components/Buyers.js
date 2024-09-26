import React, { Component } from 'react';
import { Fragment } from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { /*Button,*/ CardActionArea/*, CardActions*/ } from '@mui/material';

import { Link } from "react-router-dom"

class Buyers extends Component {

    constructor(){
        super();
        this.state = {
            compradores: {
                meta: {},
                data: {}
            }
        }
    }

    componentDidMount(){
        
        fetch("http://localhost:3001/api/users/sales")
            .then(respuesta => { 
                return respuesta.json() 
            })
            .then(resp => { 
                this.setState({
                    compradores: resp.meta.buyers
                }) 
            })
            .catch(error => console.log(error))

    
        console.log(this.state.compradores);
    }

    render(){
        return (
            <Fragment>
                <Paper elevation={3} square>
                    <Link to="/users/" className="main-link" exact="true">
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div">
                                        {this.state.compradores.length}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="h5" color="text.secondary">
                                        Usuarios compradores
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Paper>
            </Fragment>
        )
    }
}

export default Buyers;