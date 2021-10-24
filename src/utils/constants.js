import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
export const items_url = "/api/items";
//export const items_url = "/.netlify/functions/items";
export const users_url = "/api/users";
export const toppings_url = "/api/toppings";
export const orders_url = "/api/orders";
export const orderitems_url = "/api/orderitems";
export const orderaddon_url = "/api/orderaddon";
export const areas_url = "/api/areas";
export const category_url = "/api/category";
export const deliveryperiod_url = "/api/deliveryperiod";
export const document_url = "/api/document";
export const images_url =
  "https://res.cloudinary.com/dlmzwvakr/image/upload/v1632574354/mitaphotos/";
export const authuser_localstorage_key = "mita_authuser";
export const user_localstorage_key = "mita_user";
export const carts_localstorage_key = "mita_mcarts";

export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "about",
    url: "/about",
  },
  {
    id: 3,
    text: "products",
    url: "/products",
  },
  {
    id: 4,
    text: "orders",
    url: "/userorders",
  },
  {
    id: 5,
    text: "admin",
    url: "/admin",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
];

export const products_url = "https://course-api.com/react-store-products";

export const single_product_url = `https://course-api.com/react-store-single-product?id=`;

export const products = [
  {
    id: "001",
    itemno: "m001",
    name: "Brown Sugar Bubble Fresh Milk",
    price: 390,
    image: "./products/product1.jpg",
    colors: ["#ff0000", "#00ff00", "#0000ff"],
    company: "Mita",
    description: "Brown Sugar Bubble Fresh Milk",
    category: "drinks",
    shipping: true,
    featured: true,
  },
  {
    id: "002",
    itemno: "m002",
    name: "Brown Sugar White Gourd Tea",
    price: 390,
    image: "./products/product2.jpg",
    colors: ["#ff0000", "#00ff00", "#0000ff"],
    company: "Mita",
    description: "Brown Sugar Bubble Fresh Milk",
    category: "drinks",
    shipping: true,
    featured: true,
  },

  {
    id: "003",
    itemno: "m003",
    name: "Fresh Fruit Ice Tea",
    price: 390,
    image: "./products/product4.jpg",
    colors: ["#ff0000", "#00ff00", "#0000ff"],
    company: "Mita",
    description: "Fresh Fruit Ice Tea",
    category: "drinks",
    shipping: true,
    featured: true,
  },
  {
    id: "004",
    itemno: "m004",
    name: "Lemon Green Tea",
    price: 3.9,
    image: "./products/product3.jpg",
    colors: ["#ff0000", "#00ff00", "#0000ff"],
    company: "Mita",
    description: "Lemon Green Tea",
    category: "drinks",
    shipping: true,
    featured: true,
  },
];
