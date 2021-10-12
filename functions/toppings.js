const formattedReturn = require("./formattedReturn");
const getToppings = require("./toppingsTable/getToppings");
const createTopping = require("./toppingsTable/createTopping");
const deleteTopping = require("./toppingsTable/deleteTopping");
const updateTopping = require("./toppingsTable/updateTopping");
exports.handler = async (event) => {
 if (event.httpMethod === "GET") {
   return await getToppings(event);
 } else if (event.httpMethod === "POST") {
   return await createTopping(event);
 } else if (event.httpMethod === "PUT") {
   return await updateTopping(event);
 } else if (event.httpMethod === "DELETE") {
   return await deleteTopping(event);
 } else {
   console.log(event.httpMethod);
   return formattedReturn(405, {});
 }
};
