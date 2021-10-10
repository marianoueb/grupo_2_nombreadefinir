import React, { Component } from 'react';
import { Fragment } from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { /*Button,*/ CardActionArea/*, CardActions*/ } from '@mui/material';

class Total extends Component {

    constructor(){
        super();
        this.state = {
            productos: {
                meta: {},
                data: {}
            }
        }
    }

    componentDidMount(){
        
        fetch("http://localhost:3001/api/products")
            .then(respuesta => { 
                return respuesta.json() 
            })
            .then(resp => { 
                this.setState({
                    productos: resp
                }) 
            })
            .catch(error => console.log(error))

        
    }

    render(){
        return (
            <Fragment>
                <Paper elevation={3} sx={{height: "35px", width: "300px"}}>
                    <Card >
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h4">
                                    {this.state.productos.meta.count}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="h6" color="text.secondary">
                                    Cantidad de productos
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Paper>
            </Fragment>
        )
    }
}

export default Total 