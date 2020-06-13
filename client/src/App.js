import React, { useState, useEffect } from "react";
import {
  Container,
  GridList,
  GridListTile,
  makeStyles,
  Typography,
  CssBaseline,
  Card,
  CardContent,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100vh",
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
}));

function App() {
  const [pizzas, setPizzas] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const result = await fetch("/api/pizzas");

      setPizzas(await result.json());
    })();
  }, []);

  console.log(pizzas);

  return (
    <CssBaseline>
      <div className={classes.root}>
        <Container maxWidth="md">
          <header className={classes.header}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              className={classes.title}
            >
              Innopizza
            </Typography>
          </header>
          <GridList spacing={8}>
            {pizzas.map(pizza => (
              <GridListTile
                key={pizza.id}
                classes={{ tile: classes.tile }}
                elevation={2}
              >
                <Card className={classes.card} elevation={2}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {pizza.title}
                    </Typography>
                  </CardContent>
                </Card>
              </GridListTile>
            ))}
          </GridList>
        </Container>
      </div>
    </CssBaseline>
  );
}

export default App;
