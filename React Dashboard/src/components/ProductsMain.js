import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import Box from '@mui/material/Box';
import ProductsMainBought from './ProductsMainBought';
import ProductsMainTotal from './ProductsMainTotal';
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


function ProductsMain () {
  const [dataState, setDataState] = useState(initialDataState);
  const [productos, setProductos] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:3001/api/products")
        .then(respuesta => { 
            return respuesta.json() 
        })
        .then(productos => {
            setProductos(productos.data)
        }) 
        .catch(error => console.log(error))
    
    
  }, [])

  const CustomLinkCell = (props) => {
    return (
      <td>
        <Link to={`../products/${props.dataItem.id}`}>
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
        <ProductsMainBought/>
        <h1>Listado de productos</h1>
        <ProductsMainTotal/>
      </Box>
        <Grid
          data={process(productos, dataState)}
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
          <GridColumn title="Producto" cell={CustomLinkCell} field="name" width={setPercentage(25)} />
          <GridColumn title="Precio" cell={CustomLinkCell} field="price" width={setPercentage(10)} />
          <GridColumn title="Marca" cell={CustomLinkCell} field="brand" width={setPercentage(15)} />
          <GridColumn title="Categoría" cell={CustomLinkCell} field="category" width={setPercentage(10)} />
        </Grid>

    </Fragment>
  )
}
export default ProductsMain;