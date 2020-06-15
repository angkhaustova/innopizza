import React from "react";
import {
  CssBaseline,
  Grid,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Menu from "../Menu";
import Order from "../Order";
import Header from "../Header";

const useStyles = makeStyles(theme => ({
  menu: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
  },
  loader: {
    position: "sticky",
    top: 0,
    width: "100%",
  },
}));

export default function App(props) {
  const {
    pizzas,
    setCartItems,
    cartItems,
    drawerIsOpen,
    setDrawerIsOpen,
    addCartItem,
    removeCartItem,
    deliveryCost,
    setOrderId,
    orderId,
    handlePizzaLoad,
  } = props;
  const theme = useTheme();
  const classes = useStyles();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const order = (
    <Order
      pizzas={pizzas}
      setItems={setCartItems}
      items={cartItems}
      drawerIsOpen={drawerIsOpen}
      setDrawerIsOpen={setDrawerIsOpen}
      addCartItem={addCartItem}
      removeCartItem={removeCartItem}
      setCartItems={setCartItems}
      deliveryCost={deliveryCost}
      setOrderId={setOrderId}
      orderId={orderId}
      handlePizzaLoad={handlePizzaLoad}
    ></Order>
  );

  return (
    <CssBaseline>
      {!pizzas.size ? <LinearProgress className={classes.loader} /> : null}
      <Grid container spacing={0}>
        <Grid item xs={12} md={8} lg={9} className={classes.menu}>
          <Header setDrawerIsOpen={setDrawerIsOpen} items={cartItems} />
          <Menu
            items={cartItems}
            pizzas={pizzas}
            setCartItems={setCartItems}
            addCartItem={addCartItem}
            handlePizzaLoad={handlePizzaLoad}
          ></Menu>
        </Grid>
        {isSmallScreen ? (
          order
        ) : (
          <Grid item md={4} lg={3} className={classes.order}>
            {order}
          </Grid>
        )}
      </Grid>
    </CssBaseline>
  );
}
