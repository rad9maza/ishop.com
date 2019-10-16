import React, {Component} from 'react';
// import logo from './logo.svg';
import Products from "../products/Products";
// import SignIn from "../sign-in/SignIn";
// import Product from "../product/Product";
import PrimarySearchAppBar from "../primary-search-app-bar/PrimarySearchAppBar";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


import './App.css';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://ishop.com/">
                ishop
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <PrimarySearchAppBar />
                <Products />
                <Copyright />
            </div>
        );
    }
}

export default App;
