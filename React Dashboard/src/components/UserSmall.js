import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import "./css/UserSmall.css"

class UserSmall extends Component {

    constructor(){
        super();
        this.state = {
            userCount: 0
        }
    }

    componentDidMount(){
        fetch("http://localhost:3001/api/users")
            .then(respuesta => { 
                return respuesta.json() 
            })
            .then(usuarios => { 
                this.setState({
                    userCount: usuarios.meta.total
                }) 
            })
            .catch(error => console.log(error))
    }

    render(){
        return (
            <Fragment>
                <section id="user-small">
                    <FontAwesomeIcon icon={faUser} />
                    <section id="user-small-data">
                        <p>Usuarios</p>
                        <p>{ this.state.userCount }</p>
                    </section>
                </section>
            </Fragment>
        )
    }
}

export default UserSmall 