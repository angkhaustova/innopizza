import React from "react";
import {
  makeStyles,
  Typography,
  Grid,
  Drawer,
  IconButton,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  cart: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `10px 0px 89px -97px ${theme.palette.common.black} inset`,
    borderLeft: `1px solid ${theme.palette.grey["100"]}`,
  },
  title: {
    textTransform: "uppercase",
    letterSpacing: "0.2em",
  },
  header: {
    padding: theme.spacing(5),
  },
  drawer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    left: theme.spacing(2),
    top: theme.spacing(4),
  },
}));

export default function Cart(props) {
  const { items, setItems, pizzas, drawerIsOpen, setDrawerIsOpen } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const drawer = (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
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
          align="center"
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
      {items.map(itemId => {
        const addedPizzas = pizzas.filter(pizza => pizza.id === itemId);
        const quantity = addedPizzas.length;
        return `${addedPizzas[0].title} ${quantity}`;
      })}
    </Drawer>
  );

  return isSmallScreen ? (
    drawer
  ) : (
    <Grid item sm={4} lg={3} className={classes.cart}>
      {drawer}
    </Grid>
  );
}
