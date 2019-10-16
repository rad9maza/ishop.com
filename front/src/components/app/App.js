import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Products from "../products/Products";
import Product from "../product/Product";
import Footer from "./Footer";
import PrimarySearchAppBar from "./PrimarySearchAppBar";


import './App.css';
import {Route, Switch} from "react-router-dom";
import Cart from "../shopping-cart/Cart";


export default function App() {
    return (

        <div className="App">
            <CssBaseline/>
            <PrimarySearchAppBar/>
            <Switch>
                <Route exact path='/' component={Cart}/>
                <Route exact path='/products/:id' component={Product}/>
                <Route exact path='/products' component={Products}/>
            </Switch>
            <Footer/>
        </div>
    );
}

