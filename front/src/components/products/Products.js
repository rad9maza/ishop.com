import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import AxiosService from "../../utils/axiosService";

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));
export default function Products() {
    const [data, setData] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            const {data} = await AxiosService.get('/products/');
            setData(data);
        }

        fetchData();
    }, []);

    return (
        <React.Fragment>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {data.map(card => (
                            <Grid item key={card.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={card.image}
                                        title={card.id}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Link to={`/products/${card.id}`} style={{textDecoration: 'none'}}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {card.name}
                                            </Typography>
                                        </Link>
                                        <Typography>
                                            {card.description}
                                        </Typography>
                                        <IconButton
                                            edge="start"
                                            className={classes.menuButton}
                                            color="inherit"
                                            aria-label="open drawer"
                                        >
                                            <AddShoppingCart/>
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
