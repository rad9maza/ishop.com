import React, { useCallback, useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import Grid from "@material-ui/core/Grid";

import AxiosService from "../../utils/axiosService";
import { addProductToCart } from "../../utils/shopingCartService";
import { useStyles } from "./ProductStyles";

export default function Product(props) {
  const {
    match: {
      params: { id }
    }
  } = props;

  const [data, setData] = useState({});
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const classes = useStyles();

  const fetchData = useCallback(async () => {
    const { data } = await AxiosService.get(`/products/${parseInt(id, 10)}`);
    setData(data);
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  const { name, image, description } = data;

  const handleAddProductToCart = useCallback(() => {
    addProductToCart(parseInt(id));
  }, []);

  return (
    <Grid container justify="center">
      <Grid item xs={8}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={name}
          />
          <CardMedia className={classes.media} image={image} title={name} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="shoping" onClick={handleAddProductToCart}>
              <AddShoppingCart />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </Grid>
  );
}
