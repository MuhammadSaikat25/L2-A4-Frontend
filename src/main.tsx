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
import Success from "./pages/Success";
import Registration from "./pages/Registration";
import Private from "./components/Private/Private";
import ProductsManagement from "./pages/ProductsManagement";
import ProductEdit from "./components/ui/ProductsManagement/ProductEdit";
import CreateProduct from "./components/ui/ProductsManagement/CreateProduct";

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
        path: "/productsDetails",
        element: (
          <Private>
            <ProductsDetails />
          </Private>
        ),
      },
      {
        path: "/cart",
        element: (
          <Private>
            <Cart />
          </Private>
        ),
      },
      {
        path: "products/:id?",
        element: <Products />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path:"product/:id",
        element:<ProductEdit/>
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path:"/Product-Management",
        element:<ProductsManagement/>
      },
      {
        path:"/create-product",
        element:<CreateProduct/>
      }
    ],
  },
  {
    path: "/logIn",
    element: <Login></Login>,
  },
  {
    path: "/singup",
    element: <Registration />,
  },
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
