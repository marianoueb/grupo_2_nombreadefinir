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

  const [users, setUsers] = useState({})
  
  useEffect(() => {
    fetch("http://localhost:3001/api/sales/buyers")
        .then(respuesta => { 
            return respuesta.json() 
        })
        .then(sales => {
            setUsers(sales)
        }) 
        .catch(error => console.log(error))
    
    
  }, [])

  const pieData = []
  let buyers = {
        name: "Compradores",
        count: users.totalBuyers,
        share: users.totalBuyers,
        color: "blue"
    }
    pieData.push(buyers)

    let total = {
        name: "No compradores",
        count: users.totalUsers - users.totalBuyers,
        share: users.totalUsers,
        color: "red"
    }
    pieData.push(total)

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
                <ChartTitle text="Clientes compradores (Sobre el total de usuarios)" />
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
                    colorField="color"
                    field="count"
                />
                </ChartSeries>
            </Chart>
        </Paper>
    </Fragment>
  )
}
export default ProductsMain;