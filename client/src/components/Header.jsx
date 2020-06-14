import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  Badge,
  IconButton,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => {
  return {
    header: {
      [theme.breakpoints.up("md")]: { padding: theme.spacing(4) },
      backgroundColor: theme.palette.background.default,
    },
    title: {
      textTransform: "uppercase",
      letterSpacing: "0.2em",
      color: theme.palette.text.primary,
      width: "100%",
    },
    button: {
      color: theme.palette.text.primary,
    },
  };
});

export default function Header(props) {
  const { setDrawerIsOpen, items } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [scrollPosition, setSrollPosition] = useState(0);
  const handleScroll = () => setSrollPosition(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position={isSmallScreen ? "sticky" : "static"}
      className={classes.header}
      elevation={isSmallScreen && scrollPosition > 0 ? 4 : 0}
      component="header"
    >
      <Toolbar>
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          component="h1"
          align={isSmallScreen ? "left" : "center"}
          className={classes.title}
        >
          Innopizza
        </Typography>
        {isSmallScreen && (
          <IconButton
            onClick={() => setDrawerIsOpen(true)}
            className={classes.button}
          >
            <Badge
              badgeContent={Array.from(items).reduce(
                (total, [_, quantity]) => total + quantity,
                0
              )}
              color="primary"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
