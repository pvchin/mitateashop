const graphql = require("graphql");
const axios = require("axios");
const _ = require("lodash");
const formattedReturn = require("../../functions/formattedReturn");
const { table } = require("../../functions/itemsTable/airtable-items");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
} = graphql;
const getItems = require("../../functions/itemsTable/getItems");
const items_url = "/api/items";

// const users = [
//   { id: "23", firstName: "Bill", age: 20 },
//   { id: "47", firstName: "Samantha", age: 21 },
// ];

const products = [
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
    price: 490,
    image: "./products/product2.jpg",
    colors: ["#ff0000", "#00ff00", "#0000ff"],
    company: "Mita",
    description: "Brown Sugar Bubble Fresh Milk",
    category: "drinks",
    shipping: true,
    featured: true,
  },
];

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then((resp) => resp.data);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((resp) => resp.data);
      },
    },
  }),
});

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLString },
    itemno: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    image: { type: GraphQLString },
    featured: { type: GraphQLBoolean },
    shipping: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        // return _.find(users, { id: args.id });

        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data);
      },
    },
    company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then((resp) => resp.data);
      },
    },
    item: {
      type: ItemType,
      args: {},

      resolve(parentValue, args) {
        const items = table.select().firstPage();
        const { id, ...fields } = items;

        console.log("item", id, ...fields);
        return items;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
