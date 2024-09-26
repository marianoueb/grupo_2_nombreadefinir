import React from 'react';
import { Fragment } from 'react'
import Header from "./components/Header"
import Leftnav from "./components/Leftnav"
import Main from "./components/Main"
import "./App.css";
import { Route, Switch } from "react-router-dom"
import BrandsMain from "./components/BrandsMain"
import CategoriesMain from "./components/CategoriesMain"
import ProductsMain from "./components/ProductsMain"
import ProductById from "./components/ProductById"
import UserById from "./components/UserById"
import UsersMain from "./components/UsersMain"
import SalesMain from "./components/SalesMain"
import Error from "./components/Error"

function App() {
  return (
    <Fragment>
      <main>
        <Leftnav />
        <section id="right-body">
          <Header />
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/products" component={ProductsMain}/>
            <Route exact path="/products/:id" component={ProductById}/>
            <Route exact path="/brands" component={BrandsMain}/>
            <Route exact path="/users" component={UsersMain}/>
            <Route exact path="/users/:id" component={UserById}/>
            <Route exact path="/categories" component={CategoriesMain}/>
            <Route exact path="/sales" component={SalesMain}/>
            <Route component={Error}/>
          </Switch>
        </section>
      </main>
    </Fragment>
  );
}

export default App;