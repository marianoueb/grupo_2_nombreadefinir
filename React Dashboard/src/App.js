import React from 'react';
import { Fragment } from 'react'
import Header from "./components/Header"
import Leftnav from "./components/Leftnav"
import Main from "./components/Main"
import "./App.css";
import { Route } from "react-router-dom"
import BrandsMain from "./components/BrandsMain"
import CategoriesMain from "./components/CategoriesMain"
import ProductsMain from "./components/ProductsMain"
import UsersMain from "./components/UsersMain"

function App() {
  return (
    <Fragment>
      <main>
        <Leftnav />
        <section id="right-body">
          <Header />
          <Route exact path="/" component={Main}/>
          <Route path="/products" component={ProductsMain}/>
          <Route path="/brands" component={BrandsMain}/>
          <Route path="/users" component={UsersMain}/>
          <Route path="/categories" component={CategoriesMain}/>
        </section>
      </main>
    </Fragment>
  );
}

export default App;