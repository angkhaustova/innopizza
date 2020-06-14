import React, { useState, useEffect } from "react";
import App from "./App";

export default function AppContainer() {
  const [cartItems, setCartItems] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await fetch("/api/pizzas");

      setPizzas(await result.json());
    })();
  }, []);

  return (
    <App
      cartItems={cartItems}
      setCartItems={setCartItems}
      pizzas={pizzas}
      setPizzas={setPizzas}
      drawerIsOpen={drawerIsOpen}
      setDrawerIsOpen={setDrawerIsOpen}
    />
  );
}
