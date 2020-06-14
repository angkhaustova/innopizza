import React from "react";
import {
  makeStyles,
  Typography,
  Drawer,
  IconButton,
  Divider,
  Container,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Cart from "./Cart";
import OrderForm from "./OrderForm";

const useStyles = makeStyles(theme => ({
  order: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `10px 0px 89px -97px ${theme.palette.common.black} inset`,
    borderLeft: `1px solid ${theme.palette.grey["100"]}`,
  },
  title: {
    textTransform: "uppercase",
    letterSpacing: "0.2em",
  },
  header: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
      paddingTop: theme.spacing(6),
    },
    marginBottom: theme.spacing(2),
  },
  drawer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(4),
    top: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

export default function Order(props) {
  const {
    items,
    pizzas,
    drawerIsOpen,
    setDrawerIsOpen,
    addCartItem,
    removeCartItem,
    deliveryCost,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const drawer = (
    <Drawer
      anchor="right"
      variant={isSmallScreen ? "temporary" : "permanent"}
      PaperProps={{ className: classes.drawer }}
      className={classes.drawer}
      open={drawerIsOpen}
    >
      <header className={classes.header}>
        <Typography
          variant="h5"
          component="h2"
          align={isSmallScreen ? "left" : "center"}
          className={classes.title}
        >
          Order
        </Typography>
        {isSmallScreen ? (
          <IconButton
            onClick={() => setDrawerIsOpen(false)}
            className={classes.closeButton}
          >
            <ChevronRightIcon />
          </IconButton>
        ) : null}
      </header>
      <Container maxWidth="xs">
        <Cart
          items={items}
          pizzas={pizzas}
          addCartItem={addCartItem}
          removeCartItem={removeCartItem}
          deliveryCost={deliveryCost}
        ></Cart>
        <Divider className={classes.divider} />
        <OrderForm items={items}></OrderForm>
      </Container>
    </Drawer>
  );

  return drawer;
}
