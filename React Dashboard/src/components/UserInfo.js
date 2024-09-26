import React, { Component, Fragment } from "react";

class UserInfo extends Component {

  constructor(){
    super();
    this.state = {
      user: 0
    }
  }
/*
  componentDidMount(){
    fetch("")
      .then(respuesta => { 
        return respuesta.json() 
      })
      .then(logged => { 
        this.setState({
          user: logged.data
        }) 
      })
      .catch(error => console.log(error))
  }*/

    render(){
        return (
            <Fragment>
                <section id="main-nav">
                </section>
            </Fragment>
        )
    }
}

export default UserInfo 