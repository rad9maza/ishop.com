import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Switch } from "react-router-dom";

import Products from "../products/Products";
import Product from "../product/Product";
import Footer from "./Footer";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import Cart from "../shopping-cart/Cart";
import "./App.css";
import SignIn from "../sign-in/SignIn";

export default function App() {
  return (
    <div className="App">
      <CssBaseline />
      <PrimarySearchAppBar />
      <Switch>
        <Route exact path="/" component={Products} />
        <Route exact path="/products/:id" component={Product} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/shoppingCart" component={Cart} />
        <Route exact path="/profile" component={SignIn} />
      </Switch>
      <Footer />
    </div>
  );
}
