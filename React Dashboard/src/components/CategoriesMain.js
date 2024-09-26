import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import Box from '@mui/material/Box';
import CategoriesMainTotal from './CategoriesMainTotal';
import BrandsMainTotal from './BrandsMainTotal';
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

function CategoriesMain () {
  const [dataState, setDataState] = useState(initialDataState);
  const [cats, setCats] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:3001/api/categories/most")
        .then(respuesta => { 
            return respuesta.json() 
        })
        .then(cats => {
            setCats(cats.data)
        }) 
        .catch(error => console.log(error))
    
  }, [])

  const CustomLinkCell = (props) => {
    return (
      <td>
        <p>
          {
          props.dataItem[props.field]
          } 
        </p>
      </td>
    )
  }
  
  return(
    <Fragment>
      <Box className="main-top" sx={{ width: '100%', height:'26%', textAlign:'center'}}>
        <CategoriesMainTotal/>
        <h1>Listado de marcas</h1>
        <BrandsMainTotal/>
      </Box>
        <Grid
          data={process(cats, dataState)}
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
          <GridColumn title="Categoría" cell={CustomLinkCell} field="category" width={setPercentage(40)} />
          <GridColumn title="Cantidad de productos" cell={CustomLinkCell} field="count" width={setPercentage(20)} />
        </Grid>

    </Fragment>
  )
}

export default CategoriesMain;