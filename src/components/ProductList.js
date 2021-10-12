import React, { useState} from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";
import { useItems } from "./react-query/items/useItems";


const ProductList = () => {
  const { filtered_products: products, grid_view } = useFilterContext();
  //const [grid_view, serGrid_View] = useState(true)
  //const { items: products } = useItems()
  
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  }
  if (grid_view === false) {
    return <ListView products={products} />;
  }
  return <GridView products={products}>product list</GridView>;
};

export default ProductList;
