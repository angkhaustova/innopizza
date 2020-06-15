import React from "react";
import {
  makeStyles,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

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
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
}));

export default function Order(props) {
  const {
    items,
    pizzas,
    addCartItem,
    removeCartItem,
    deliveryCost,
    exchangeRate,
  } = props;
  const classes = useStyles();
  const totalCostUSD = (
    Array.from(items).reduce((total, [id, quantity]) => {
      const pizza = pizzas.get(id);
      return total + pizza.priceUSD * quantity;
    }, 0) + deliveryCost
  ).toFixed(2);
  const totalCostEUR = (totalCostUSD * exchangeRate).toFixed(2);

  return items.size ? (
    <React.Fragment>
      <List dense className={classes.root}>
        {Array.from(items).map(([itemId, quantity]) => {
          const pizza = pizzas.get(itemId);

          return (
            <ListItem key={itemId}>
              <ListItemAvatar>
                <Avatar
                  alt={pizza.title}
                  src={`/images/pizzas/${pizza.code}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${pizza.title} Pizza`}
                secondary={`$${(pizza.priceUSD * quantity).toFixed(2)} / €${(
                  pizza.priceUSD *
                  quantity *
                  exchangeRate
                ).toFixed(2)}`}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => removeCartItem(itemId)}>
                  <RemoveIcon fontSize={"small"} />
                </IconButton>
                {quantity}
                <IconButton onClick={() => addCartItem(itemId)}>
                  <AddIcon fontSize={"small"} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        <ListItem>
          <ListItemAvatar>
            <Avatar>D</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`Delivery (fixed)`}
            secondary={`$${deliveryCost} / €${(
              deliveryCost * exchangeRate
            ).toFixed(2)}`}
          />
        </ListItem>
      </List>
      <Divider className={classes.divider} />
      <Typography align="center">
        Total is ${totalCostUSD} / €{totalCostEUR}
      </Typography>
    </React.Fragment>
  ) : (
    <Typography variant="subtitle1" align="center" color="textSecondary">
      Nothing here yet
    </Typography>
  );
}
