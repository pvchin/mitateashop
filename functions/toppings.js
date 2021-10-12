const formattedReturn = require("./formattedReturn");
const getToppings = require("./toppingsTable/getToppings");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getToppings(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
