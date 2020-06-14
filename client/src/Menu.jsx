import React from "react";
import {
  Container,
  GridList,
  GridListTile,
  makeStyles,
  Typography,
  CssBaseline,
  Card,
  CardContent,
  IconButton,
  CardHeader,
  CardMedia,
  Avatar,
  Grid,
  Paper,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  menu: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
  },
  title: {
    textTransform: "uppercase",
    letterSpacing: "0.2em",
  },
  header: {
    padding: "42px",
  },
  tile: {
    padding: "8px",
  },
  card: {
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
}));

export default function Menu(props) {
  const { pizzas, setCartItems } = props;
  const classes = useStyles();
  const theme = useTheme();
  const betweenSmMd = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));

  return (
    <Container maxWidth="md">
      <GridList
        spacing={8}
        cellHeight="auto"
        cols={betweenSmMd ? 1 : isMd ? 2 : 3}
      >
        {pizzas.map(pizza => (
          <GridListTile
            key={pizza.id}
            classes={{ tile: classes.tile }}
            elevation={2}
          >
            <Card className={classes.card} elevation={1}>
              <CardHeader
                title={pizza.title}
                subheader={`$${pizza.price}`}
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={() =>
                      setCartItems(prevCart => prevCart.concat(pizza.id))
                    }
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                }
              />
              <CardMedia
                className={classes.media}
                image={`/images/pizzas/${pizza.code}.jpg`}
                title={`${pizza.title} Pizza`}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`${pizza.description.match(/^.{122,}?\./gi)[0]}..`}
                </Typography>
              </CardContent>
            </Card>
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
}
