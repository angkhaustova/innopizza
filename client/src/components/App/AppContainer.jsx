import React, { useState, useEffect } from "react";
import App from "./App";

export default function AppContainer() {
  const [cartItems, setCartItems] = useState(new Map());
  const [pizzas, setPizzas] = useState(new Map());
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [orderId, setOrderId] = useState();

  const deliveryCost = 5.0;
  const exchangeRate = 0.89;

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

  const handlePizzaLoad = id =>
    setPizzas(
      prevPizzas =>
        new Map(prevPizzas.set(id, { ...prevPizzas.get(id), loading: false }))
    );

  useEffect(() => {
    (async () => {
      const result = await fetch("/api/pizzas");
      const json = await result.json();
      const mapped = json.map(pizza => {
        return [
          pizza.id,
          {
            ...pizza,
            shortDescription: `${
              pizza.description.match(/^.{0,140}\w(?=\s)/gi)[0]
            }...`,
            priceUSD: pizza.price,
            priceEUR: pizza.price * exchangeRate,
            loading: true,
          },
        ];
      });

      setPizzas(new Map(mapped));
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
      orderId={orderId}
      setOrderId={setOrderId}
      handlePizzaLoad={handlePizzaLoad}
      exchangeRate={exchangeRate}
    />
  );
}
