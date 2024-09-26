import React, { Component } from 'react';
import { Fragment } from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { /*Button,*/ CardActionArea/*, CardActions*/ } from '@mui/material';

class Buyers extends Component {

    constructor(){
        super();
        this.state = {
            compradores: []
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
        let buyers = this.state.compradores
        return (
            <Fragment>
                <Paper elevation={3} sx={{height: "35px", width: "300px"}}>
                    <Card >
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h4">
                                    {buyers.length}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="h6" color="text.secondary">
                                    Usuarios compradores
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Paper>
            </Fragment>
        )
    }
}

export default Buyers 