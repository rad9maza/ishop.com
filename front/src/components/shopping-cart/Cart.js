import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import AxiosService from "../../utils/axiosService";

const useStyles = makeStyles(theme => ({
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
  const [data, setData] = useState([]);
  const [value, setValue] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await AxiosService.get(`/products/`);
      setData(data);
    }

    fetchData();
  }, []);

  const handleChange = name => event => {
    localStorage.setItem(name, event.target.value);
    setValue(!value);
  };
  const classes = useStyles();

  return (
    <React.Fragment>
      <main>
        {data.map(card => (
          <Card className={classes.card}>
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
              <TextField
                id="standard-number"
                label="Count of products"
                value={localStorage.getItem(card.id)}
                onChange={handleChange(card.id)}
                type="number"
                inputProps={{ min: "1", max: "10", step: "1" }}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </div>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Total price:
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {card.price}
                </Typography>
              </CardContent>
            </div>
          </Card>
        ))}
      </main>
    </React.Fragment>
  );
}
