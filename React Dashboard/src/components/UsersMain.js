import React, { Fragment, Component } from 'react';

class UsersMain extends Component {

  constructor(){
      super();
      this.state = {
          
      }
  }

  componentDidMount(){
      fetch("")
          .then(respuesta => { 
              return respuesta.json() 
          })
          .then(resp => { 
              this.setState({
                  
              }) 
          })
          .catch(error => console.log(error))
  }

  render(){
      return (
          <Fragment>
              
          </Fragment>
      )
  }
}

export default UsersMain 