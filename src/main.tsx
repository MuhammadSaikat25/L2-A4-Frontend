import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path:'/productsDetails',
        element:<ProductsDetails/>
      },
      {
        path:'/cart',
        element:<Cart/>
      },
      {
        path:"products/:id?",
        element:<Products/>
      },
      {
        path:"/checkout",
        element:<Checkout/>
      }
    ],
  },
  {
    path:'/logIn',
    element:<Login></Login>
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
