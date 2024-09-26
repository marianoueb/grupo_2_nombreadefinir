import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import Box from '@mui/material/Box';
import UsersMainBuyers from './UsersMainBuyers';
import UsersMainTotal from './UsersMainTotal';
import { Link } from 'react-router-dom';

const initialDataState = {
  sort: [
    {
      field: "code",
      dir: "asc",
    },
  ],
  take: 6,
  skip: 0,
};

var gridWidth = 1400

const setPercentage = (percentage) => {
  return Math.round(gridWidth / 100) * percentage;
};


function UsersMain () {
  const [dataState, setDataState] = useState(initialDataState);
  const [usuarios, setUsuarios] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:3001/api/users")
        .then(respuesta => { 
            return respuesta.json() 
        })
        .then(users => {
            setUsuarios(users.data)
        }) 
        .catch(error => console.log(error))
    
    
  }, [])

  const CustomLinkCell = (props) => {
    return (
      <td>
        <Link to={`../users/${props.dataItem.id}`}>
          {
          props.dataItem[props.field]
          } 
        </Link>
      </td>
    )
  }

  return(
    <Fragment>
      <Box className="main-top" sx={{ width: '100%', height:'26%', textAlign:'center'}}>
        <UsersMainBuyers/>
        <h1>Listado de usuarios</h1>
        <UsersMainTotal/>
      </Box>
        <Grid
          data={process(usuarios, dataState)}
          {...dataState}
          onDataStateChange={(e) => {
            setDataState(e.dataState);
          }}
          sortable={true}
          reorderable={true}
          pageable={{
          }}
          style={{
            height: "65%",
            width: "90%"
          }}
        >
          <GridColumn title="ID" cell={CustomLinkCell} field="id" locked={true} width={setPercentage(5)} />
          <GridColumn title="Usuario" cell={CustomLinkCell} field="email" width={setPercentage(25)} />
          <GridColumn title="Nombre" cell={CustomLinkCell} field="name" width={setPercentage(10)} />
          <GridColumn title="Apellido" cell={CustomLinkCell} field="surname" width={setPercentage(15)} />
          <GridColumn title="Tipo" cell={CustomLinkCell} field="type" width={setPercentage(10)} />
        </Grid>

    </Fragment>
  )
}
export default UsersMain;