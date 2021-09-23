import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { ProductsProvider } from "./context/products_context";
import { theme } from "./components/theme";
import { Loading } from "./components/app/Loading";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

//dev-lby8zvb2.us.auth0.com
//0fGOG1NW8OZ2GRE5z8lKd7255Ul3IYeM
const queryClient = new QueryClient();

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain="dev-lby8zvb2.us.auth0.com"
        clientId="0fGOG1NW8OZ2GRE5z8lKd7255Ul3IYeM"
        redirectUri={window.location.origin}
        cacheLocation="localstorage"
      >
        <UserProvider>
          <ProductsProvider>
            <FilterProvider>
              <CartProvider>
                <div>
                  <Loading />
                  <App />
                </div>
              </CartProvider>
            </FilterProvider>
          </ProductsProvider>
        </UserProvider>
      </Auth0Provider>
    </QueryClientProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
