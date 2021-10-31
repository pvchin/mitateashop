import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
  Home,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  PrivateAdminRoute,
  AuthWrapper,
  UserOrders,
  AdminOrders,
  Admin,
  Signin,
} from "./pages";
import SingleProduct from "../src/components/SingleProduct";
import UserProfile from "./components/UserProfile";
import ProductForm from "./components/ProductForm";

function App() {
  return (
    // <AuthWrapper>
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>

        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/user">
          <UserProfile />
        </Route>
        <Route exact path="/singleproduct">
          <SingleProduct />
        </Route>
        <Route exact path="/productform">
          <ProductForm />
        </Route>

        <Route exact path="/products/:id" children={<SingleProduct />} />
        <PrivateRoute exact path="/checkout">
          <Checkout />
        </PrivateRoute>
        <PrivateRoute exact path="/myorders">
          <UserOrders />
        </PrivateRoute>
        <PrivateAdminRoute exact path="/admin">
          <Admin />
        </PrivateAdminRoute>
        <Route exact path="/*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
    // </AuthWrapper>
  );
}

export default App;
