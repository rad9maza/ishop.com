import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import { TablePagination } from "@trendmicro/react-paginations";
import "@trendmicro/react-paginations/dist/react-paginations.css";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import AxiosService from "../../utils/axiosService";
import { addProductToCart } from "../../utils/shopingCartService";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  menu: {
    width: 200
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

export default function Products() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [state, setState] = React.useState({
    category: "",
    search: "",
    page: 1,
    pageLength: 4,
    totalRecords: 1
  });

  useEffect(() => {
    async function fetchData() {
      const { page, pageLength } = state;
      const { data } = await AxiosService.get("/products/", {
        params: { page, pageLength }
      });
      setData(data[0]);
      setState({ ...state, totalRecords: data[1] });
      await AxiosService.get("/categories/").then(response => {
        setCategories(response.data);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getFilteredData() {
      const { page, pageLength, category, search } = state;
      const { data } = await AxiosService.get("/products/", {
        params: { page, pageLength, category, search }
      });
      setData(data[0]);
      await setState({ ...state, totalRecords: data[1] });
    }
    getFilteredData();
  }, [state.category, state.page, state.pageLength, state.search]);

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
      page: 1
    });
  };

  const searchHandler = event => {
    // if (event.key === "Enter") {
      setState({
        ...state,
        search: event.target.value,
        page: 1
      });
    // }
  };

  return (
    <React.Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <Grid
              xs={6}
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-end"
            >
              <TablePagination
                type="reduced"
                page={state.page}
                pageLength={state.pageLength}
                pageLengthMenu={[4, 10, 15]}
                totalRecords={state.totalRecords}
                onPageChange={({ page, pageLength }) => {
                  setState({ ...state, page, pageLength });
                }}
                prevPageRenderer={() => <i className="fa fa-angle-left" />}
                nextPageRenderer={() => <i className="fa fa-angle-right" />}
              />
            </Grid>
            <Grid
              xs={6}
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              <TextField
                placeholder="Search…"
                className={classes.textField}
                onKeyPress={searchHandler}
                margin="normal"
              />
              <TextField
                id="standard-select-category"
                select
                label="Category"
                className={classes.textField}
                value={state.category}
                onChange={handleChange("category")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
              >
                <MenuItem key={""} value={""}>
                  {"All"}
                </MenuItem>
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {data.map(card => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title={card.id}
                  />
                  <CardContent className={classes.cardContent}>
                    <Link
                      to={`/products/${card.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                    </Link>
                    <Typography>{card.description}</Typography>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="open drawer"
                      onClick={() => {
                        addProductToCart(card.id);
                      }}
                    >
                      <AddShoppingCart />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
