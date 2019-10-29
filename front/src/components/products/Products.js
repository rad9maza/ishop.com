import React, {useCallback, useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
import { useStyles } from "./ProductsStyles";

export default function Products() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState({
    category: "",
    search: "",
    page: 1,
    pageLength: 4,
    totalRecords: 1
  });
  useEffect(() => {
    async function fetchData() {
      const { page, pageLength } = state;
      const { data } = await AxiosService.get("/products", {
        params: { page, pageLength }
      });
      const [products, total] = data;
      setData(products);
      setState({ ...state, totalRecords: total });
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      const cat = await AxiosService.get("/categories");
      setCategories(cat.data);
    }
    fetchCategories();
  }, []);

  const getFilteredData = useCallback(async () => {
    const { page, pageLength, category, search } = state;
    const { data } = await AxiosService.get("/products/", {
      params: { page, pageLength, category, search }
    });
    const [products, total] = data;
    setData(products);
    setState({ ...state, totalRecords: total });
  }, [state.category, state.page, state.pageLength, state.search]);

  useEffect(() => {
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
    setState({
      ...state,
      search: event.target.value,
      page: 1
    });
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
            {data.map(({ name, description, image, id }) => (
              <Grid item key={id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={image}
                    title={id}
                  />
                  <CardContent className={classes.cardContent}>
                    <Link
                      to={`/products/${id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography gutterBottom variant="h5" component="h2">
                        {name}
                      </Typography>
                    </Link>
                    <Typography>{description}</Typography>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="open drawer"
                      onClick={() => {
                        addProductToCart(id);
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
