import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

import { getCountProductsInCart } from "../../utils/shopingCartService";
import { useStyles } from "./PrimarySearchAppBarStyles";

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  //TODO: changing badge content
  const [countProducts, setCountProducts] = useState(getCountProductsInCart());

  useEffect(() => {
    setCountProducts(getCountProductsInCart());
  }, []);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
        <MenuItem>
          <IconButton
            aria-label={`show ${countProducts} new mails`}
            color="inherit"
          >
            <Badge badgeContent={countProducts} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <p>Shoping cart</p>
        </MenuItem>
      </Link>
      <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
        <MenuItem>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>{" "}
      </Link>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            ISHOP
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
              <IconButton
                aria-label={`show ${countProducts} new mails`}
                color="inherit"
              >
                <Badge badgeContent={countProducts} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "white" }}
            >
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Link>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
