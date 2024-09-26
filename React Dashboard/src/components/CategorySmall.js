import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintRoller } from '@fortawesome/free-solid-svg-icons'
import "./css/CategorySmall.css"

class CategorySmall extends Component {

    constructor(){
        super();
        this.state = {
            catsCount: 0
        }
    }

    componentDidMount(){
        fetch("http://localhost:3001/api/categories")
            .then(respuesta => { 
                return respuesta.json() 
            })
            .then(cats => { 
                this.setState({
                    catsCount: cats.meta.count
                }) 
            })
            .catch(error => console.log(error))
    }

    render(){
        return (
            <Fragment>
                <section id="category-small">
                    <FontAwesomeIcon icon={faPaintRoller} />
                    <section id="category-small-data">
                        <p>Categorías</p>
                        <p>{ this.state.catsCount }</p>
                    </section>
                </section>
            </Fragment>
        )
    }
}

export default CategorySmall 