import React, { Component } from 'react';
import { Fragment } from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { /*Button,*/ CardActionArea/*, CardActions*/ } from '@mui/material';

class Sales extends Component {

    constructor(){
        super();
        this.state = {
            ventas: {
                meta: {},
                data: {}
            }
        }
    }

    componentDidMount(){
        
        fetch("http://localhost:3001/api/products/sold")
            .then(respuesta => { 
                return respuesta.json() 
            })
            .then(resp => { 
                this.setState({
                    ventas: resp
                }) 
            })
            .catch(error => console.log(error))

        
    }

    render(){
        return (
            <Fragment>
                <Paper elevation={3} square>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h3" component="div">
                                    {this.state.ventas.meta.cartCount}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="h5" color="text.secondary">
                                    Ordenes finalizadas en total
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Paper>
            </Fragment>
        )
    }
}

export default Sales 