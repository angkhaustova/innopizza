import React, { useState, useEffect } from "react";
import App from "./App";

export default function AppContainer() {
  const [cartItems, setCartItems] = useState(new Map());
  const [pizzas, setPizzas] = useState([]);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const deliveryCost = 5.0;

  const addCartItem = id =>
    setCartItems(
      prevCart =>
        new Map(prevCart.set(id, prevCart.has(id) ? prevCart.get(id) + 1 : 1))
    );

  const removeCartItem = id =>
    setCartItems(prevCart => {
      const itemQuantity = prevCart.get(id);

      if (itemQuantity > 1) {
        prevCart.set(id, itemQuantity - 1);
      } else {
        prevCart.delete(id);
      }

      return new Map(prevCart);
    });

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
      addCartItem={addCartItem}
      removeCartItem={removeCartItem}
      deliveryCost={deliveryCost}
    />
  );
}