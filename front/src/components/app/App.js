import React, {Component} from 'react';
// import logo from './logo.svg';
import Products from "../products/Products";
import SignIn from "../sign-in/SignIn";
import Product from "../product/Product";
import PrimarySearchAppBar from "../primary-search-app-bar/PrimarySearchAppBar";
import './App.css';


class App extends Component {
    render() {
        return (
            <div className="App">
                <PrimarySearchAppBar/>
                <Products/>
            </div>
        );
    }
}

export default App;
