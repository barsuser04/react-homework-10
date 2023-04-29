import { useEffect, useReducer } from "react";
import "./App.css";
import Product from "./componnets/Product";
import TableProducts from "./componnets/TableProducts";
import { proDuctData } from "./utils/constants";

const initialState = {
  product: JSON.parse(localStorage.getItem("fruits")) || proDuctData,
};

const onlineReducer = (state, action) => {
  switch (action.type) {
    case "addProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + item.staticPrice
            };
          }
          return item;
        }),
      };
    case "incrementProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + item.staticPrice,
            };
          }
          return item;
        }),
      };
    case "decrementProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload && item.quantity !== 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
              price: item.price - item.staticPrice,
            };
          }
          return item;
        }),
      };

    case "removeProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload && item.quantity !== 0) {
            return {
              ...item,
              quantity: (item.quantity = 0),
              price: item.staticPrice,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

function App() {
  const [store, dispatchStore] = useReducer(onlineReducer, initialState);

  useEffect(() => {
    localStorage.setItem("fruits", JSON.stringify(store.product));
  }, [store.product]);

  const incrementProductHandler = (id) => {
    dispatchStore({ type: "incrementProduct", payload: id });
  };

  const decrementProductHandler = (id) => {
    dispatchStore({ type: "decrementProduct", payload: id });
  };

  const addProductHandler = (id) => {
    dispatchStore({ type: "addProduct", payload: id });
  };

  const removeProductHandler = (id) => {
    dispatchStore({ type: "removeProduct", payload: id });
  };
  return (
    <>
      <Product addProductHandler={addProductHandler} store={store.product} />
      <TableProducts
        removeProductHandler={removeProductHandler}
        decrementProductHandler={decrementProductHandler}
        incrementProductHandler={incrementProductHandler}
        store={store.product}
      />
    </>
  );
}

export default App;
