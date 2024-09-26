import React from 'react';
import { Fragment } from 'react';
import ProductSmall from './ProductSmall';
import UserSmall from './UserSmall';
import BrandSmall from './BrandSmall';
import CategorySmall from './CategorySmall';
import LastUploaded from './LastUploaded';
import MostBought from './MostBought';
import LastRegistered from './LastRegistered';
// Exportimport Admins from './Admins';
import Sales from './Sales';
import Buyers from './Buyers';
import CatProducts from './CatProducts';
import BrandProducts from './BrandProducts';
import "./css/Main.css"
import Divider from '@mui/material/Divider';
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';

function Main() {
  return (
    <Fragment>
      <section id="small-dashboard">
        <ProductSmall />
        <UserSmall />
        <CategorySmall />
        <BrandSmall />
      </section>
      <Divider> </Divider>
      <section id="medium-dashboard">
        <Masonry columns={3} spacing={2}>
          {comps.map((item, index) => (
            <MasonryItem key={index}>
              {item}
            </MasonryItem>
          ))}
        </Masonry>
        <section id="separador"><p>.</p></section>
      </section>
    </Fragment>
  );
}

let comps = [<LastRegistered />, <Sales />, <LastUploaded />, <MostBought />, <BrandProducts />, <CatProducts />, <Buyers />]
/*
<section id="md-db-st-cl" className="medium-dashboard-column">
          <LastUploaded />
          <MostBought />
        </section>
        <section id="md-db-nd-cl" className="medium-dashboard-column">
          <Buyers />
          <LastRegistered />
          <Sales />
        </section>
        <section id="md-db-rd-cl" className="medium-dashboard-column">
          <CatProducts />
          <BrandProducts />
        </section>
*/
export default Main;