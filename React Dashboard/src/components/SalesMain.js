import React from 'react';
import { Fragment } from 'react'
import Sales from './Sales';
import MostBought from './MostBought';
import MostBuyers from './MostBuyers';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';
import Divider from '@mui/material/Divider';
import PieProducts from './PieProducts';
import PieUsers from './PieUsers';

function SalesMain() {
  let comps = [<MostBought />, <h1>Ventas</h1>, <MostBuyers />, <Divider > </Divider>, <Sales />]
  return (
    <Fragment>
      <Box className="main-top" sx={{ width: '95%', textAlign:'center'}}>
      <Masonry columns={3} spacing={2}>
          {comps.map((item, index) => (
            <MasonryItem key={index}>
              {item}
            </MasonryItem>
          ))}
        </Masonry>
      </Box>
      <div class="sales-pies">
        <PieProducts />
        <PieUsers />
      </div>
      
    </Fragment>
  );
}

export default SalesMain;