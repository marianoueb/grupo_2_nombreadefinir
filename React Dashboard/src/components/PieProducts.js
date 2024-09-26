import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartTitle,
    ChartLegend,
  } from "@progress/kendo-react-charts";
import 'hammerjs';
import Paper from '@mui/material/Paper';

function ProductsMain () {

  const [productos, setProductos] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:3001/api/sales/products")
        .then(respuesta => { 
            return respuesta.json() 
        })
        .then(products => {
            setProductos(products.everyOrder)
        }) 
        .catch(error => console.log(error))
    
    
  }, [])

  const pieData = []
  for (let i = 0; i < productos.length; i++){
      console.log("productos ",productos);
      let producto = productos[i]
      console.log("producto ", producto);
      let prod = {
            name: producto.product,
            count: producto.count,
            share: producto.percent.toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          })
      }
      console.log("prod ", prod);
      pieData.push(prod)
  }

  const labelContent = (props) => {
    return `${props.dataItem.name}`;
  };

  return(
    <Fragment>
        <Paper elevation={3} style={{
                    width: "47%"
                }} >
            <Chart
                style={{
                    maxWidth: "100%"
                }}
            >
                <ChartTitle text="Productos comprados (Sobre el total de productos)" />
                <ChartLegend position="top" orientation="horizontal" />
                <ChartSeries>
                <ChartSeriesItem
                    type="pie"
                    overlay={{
                    gradient: "roundedBevel",
                    }}
                    labels={{ 
                        visible: true,
                        content: labelContent
                    }}
                    tooltip={{
                    visible: true,
                    }}
                    data={pieData}
                    categoryField="name"
                    field="count"
                />
                </ChartSeries>
            </Chart>
        </Paper>
    </Fragment>
  )
}
export default ProductsMain;