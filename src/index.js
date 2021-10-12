import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";
import { ProductsProvider } from "./context/products_context";
import { theme } from "./theme";
import { Loading } from "./app/Loading";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

//dev-f66j80-e.us.auth0.com
//5rpDhSrZRFYymenb2cvEQcLBblEUB39B
const queryClient = new QueryClient();

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Auth0Provider
          domain="dev-f66j80-e.us.auth0.com"
          clientId="5rpDhSrZRFYymenb2cvEQcLBblEUB39B"
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
      </RecoilRoot>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
