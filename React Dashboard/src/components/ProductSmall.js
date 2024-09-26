import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox } from '@fortawesome/free-solid-svg-icons'
import "./css/ProductSmall.css"

class ProductSmall extends Component {

    constructor(){
        super();
        this.state = {
            productCount: 0
        }
    }

    componentDidMount(){
        fetch("http://localhost:3001/api/products")
            .then(respuesta => { 
                return respuesta.json() 
            })
            .then(productos => { 
                this.setState({
                    productCount: productos.meta.count
                }) 
            })
            .catch(error => console.log(error))
    }

    render(){
        return (
            <Fragment>
                <section id="product-small">
                    <FontAwesomeIcon icon={faBox} />
                    <section id="product-small-data">
                        <p>Productos</p>
                        <p>{ this.state.productCount }</p>
                    </section>
                </section>
            </Fragment>
        )
    }
}

export default ProductSmall 