import React from "react";
import { CssBaseline, Grid, makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Menu from "../Menu";
import Cart from "../Cart";
import Header from "../Header";

const useStyles = makeStyles(theme => ({
  menu: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
  },
}));

export default function App(props) {
  const {
    pizzas,
    setCartItems,
    cartItems,
    drawerIsOpen,
    setDrawerIsOpen,
  } = props;
  const theme = useTheme();
  const classes = useStyles();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <CssBaseline>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={8} lg={9} className={classes.menu}>
          <Header setDrawerIsOpen={setDrawerIsOpen} />
          <Menu pizzas={pizzas} setCartItems={setCartItems}></Menu>
        </Grid>
        <Cart
          pizzas={pizzas}
          setItems={setCartItems}
          items={cartItems}
          drawerIsOpen={drawerIsOpen}
          setDrawerIsOpen={setDrawerIsOpen}
        ></Cart>
      </Grid>
    </CssBaseline>
  );
}
