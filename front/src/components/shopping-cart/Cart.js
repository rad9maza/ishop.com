import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import AxiosService from "../../utils/axiosService";
import {
  deleteProductFromCart,
  getProductCountInCart,
  updateProductCountInCart,
  getAllProductIdsInCart,
  cleanCart,
  getAllProductFromCart
} from "../../utils/shopingCartService";
import GoogleLogin from "react-google-login";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  card: {
    display: "flex",
    minWidth: "30%"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 130
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

export default function Cart() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [value, setValue] = useState(false);
  const [state, setState] = React.useState({
    user: JSON.parse(localStorage.getItem("profileObj")),
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("isAuthenticated")
  });

  useEffect(() => {
    console.log(data);
    async function fetchData() {
      const allProductIdsInCart = getAllProductIdsInCart();
      const { data } = await AxiosService.get(`/products/`, {
        params: { ids: [allProductIdsInCart] }
      });
      setData(data);
      console.log(data);
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
    const params = {
      grant_type: "social",
      client_id: 1,
      client_secret: "IZvNu58EPugyPgiWVO5OyiX0VyxRhfSGSDAKPTBE",
      provider: "google",
      access_token: response.accessToken
    };
    await AxiosService.post("/oauth/token", params, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("profileObj", JSON.stringify(response.profileObj));
      localStorage.setItem("isAuthenticated", true);
      setState({
        isAuthenticated: true,
        user: response.profileObj,
        token: res.data.access_token
      });
    });
  }
  async function byeNow() {
    const productIdsInCart = getAllProductFromCart();
    const params = {
      productIdsInCart
    };
    await AxiosService.post("/offers", params).then(res => {
      if (res.status !== 200) {
        cleanCart();
        setData([]);
      }
    });
  }
  let buy =
    data.length === 0 ? (
      <div>Cart is empty</div>
    ) : !!state.isAuthenticated ? (
      <div>
        <Button
          onClick={byeNow}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Buy now
        </Button>
      </div>
    ) : (
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={googleResponse}
        />
      </div>
    );
  return (
    <React.Fragment>
      <main>
        {buy}
        {data.map(card => (
          <Card className={classes.card} key={card.id}>
            <CardMedia
              className={classes.cover}
              image={card.image}
              title="Live from space album cover"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {card.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Price: {card.price}
                </Typography>
              </CardContent>
              <div>
                <TextField
                  id="standard-number"
                  label="Count of products"
                  value={getProductCountInCart(card.id)}
                  onChange={handleChange(card.id)}
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
                  onClick={handleDelete(card.id)}
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
                  {card.price * getProductCountInCart(card.id)}
                </Typography>
              </CardContent>
            </div>
          </Card>
        ))}
      </main>
    </React.Fragment>
  );
}
