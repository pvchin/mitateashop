import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
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
    id: "m001",
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
    id: "m002",
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
    id: "m003",
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
    id: "m004",
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
