import React, { Component, Fragment } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHammer, faSink, faFan, faSnowplow, faPaintRoller } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom"

class CatProducts extends Component {

    constructor(){
        super();
        this.state = {
            cats: []
        }
    }

    componentDidMount(){
        fetch("http://localhost:3001/api/categories/most")
            .then(respuesta => { 
                return respuesta.json() 
            })
            .then(resp => { 
                this.setState({
                    cats: resp.top
                }) 
            })
            .catch(error => console.log(error))
    }

    render(){
        function switchIcon(param){
            switch(param) {
                case 'fas fa-hammer':
                  return <FontAwesomeIcon icon={faHammer} />;
                case 'fas fa-paint-roller':
                  return <FontAwesomeIcon icon={faPaintRoller} />;
                case 'fas fa-sink':
                  return <FontAwesomeIcon icon={faSink} />;
                case 'fas fa-fan':
                  return <FontAwesomeIcon icon={faFan} />;
                default:
                  return <FontAwesomeIcon icon={faSnowplow} />;
              }
        }
        return (
            <Fragment>
                <Paper elevation={3} square>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                <h3><strong>Categorias con mas productos</strong></h3>
                            </ListSubheader>
                        }
                        >
                        { this.state.cats.map(cat => 
                        <Link to={"/categories/"+cat.id} className="main-link" exact="true">
                            <ListItemButton>
                                <IconButton edge="end" aria-label="">
                                    {switchIcon(cat.icon)}
                                </IconButton>
                                <ListItemText
                                    primary={cat.category}
                                    secondary={"ID: " + cat.id}
                                />
                                <IconButton edge="end" aria-label="">
                                    <div>
                                        <h5>Productos</h5>
                                        <p>{cat.count}</p>
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

export default CatProducts 