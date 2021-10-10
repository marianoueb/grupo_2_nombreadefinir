import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import "./css/BrandSmall.css"

class BrandSmall extends Component {

    constructor(){
        super();
        this.state = {
            brandCount: 0
        }
    }

    componentDidMount(){
        fetch("http://localhost:3001/api/brands")
            .then(respuesta => { 
                return respuesta.json() 
            })
            .then(marcas => { 
                this.setState({
                    brandCount: marcas.meta.count
                }) 
            })
            .catch(error => console.log(error))
    }

    render(){
        return (
            <Fragment>
                <section id="brand-small">
                    <FontAwesomeIcon icon={faTruck} />
                    <section id="brand-small-data">
                        <p>Marcas</p>
                        <p>{ this.state.brandCount }</p>
                    </section>
                </section>
            </Fragment>
        )
    }
}

export default BrandSmall 