import React, {useEffect, useMemo, useState} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";

import AxiosService from "../../utils/axiosService";
import {
  cleanCart,
  deleteProductFromCart,
  getAllProductFromCart,
  getAllProductIdsInCart,
  getProductCountInCart,
  updateProductCountInCart
} from "../../utils/shopingCartService";
import {useAuth, useGoogleResponse} from "../../utils/customHooks";
import {useStyles} from "./CartStyles";

export default function Cart() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [value, setValue] = useState(false);
  const [state, setState] = useState(useAuth());

  useEffect(() => {
    async function fetchData() {
      const allProductIdsInCart = getAllProductIdsInCart();
      const { data } = await AxiosService.get(`/products/`, {
        params: { ids: [allProductIdsInCart] }
      });
      setData(data);
    }

    fetchData();
  }, []);

  const handleChange = id => event => {
    updateProductCountInCart(id, event.target.value);
    setValue(!value);
  };

  const handleDelete = id => event => {
    deleteProductFromCart(id);
    setData(data.filter(item => item.id !== id));
  };

  async function googleResponse(response) {
    setState(await useGoogleResponse(response));
  }

  async function byeNow() {
    const productIdsInCart = getAllProductFromCart();
    const params = {
      productIdsInCart
    };
    const { data } = await AxiosService.post("/offers", params);
    if (data.status !== 200) {
      cleanCart();
      setData([]);
    }
  }
  let buy = useMemo(
    () =>
      data.length === 0 ? (
        <Typography variant="h3" gutterBottom>
          Cart is empty
        </Typography>
      ) : !!state.user ? (
        <Button
          onClick={byeNow}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Buy now
        </Button>
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={googleResponse}
        />
      ),
    [data.length, state.user]
  );
  return (
    <React.Fragment>
      <main>
        <div align="center">{buy}</div>
        {data.map(({ name, price, image, id }) => (
          <Card className={classes.card} key={id}>
            <CardMedia
              className={classes.cover}
              image={image}
              title="Live from space album cover"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Price: {price}
                </Typography>
              </CardContent>
              <div>
                <TextField
                  id="standard-number"
                  label="Count of products"
                  value={getProductCountInCart(id)}
                  onChange={handleChange(id)}
                  type="number"
                  inputProps={{ min: "1", max: "10", step: "1" }}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                />
                <IconButton
                  aria-label="delete"
                  style={{
                    fontSize: 30,
                    verticalAlign: "bottom"
                  }}
                  onClick={handleDelete(id)}
                >
                  <Delete />
                </IconButton>
              </div>
            </div>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Total price:
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {price * getProductCountInCart(id)}
                </Typography>
              </CardContent>
            </div>
          </Card>
        ))}
      </main>
    </React.Fragment>
  );
}
