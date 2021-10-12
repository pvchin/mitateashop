const formattedReturn = require("./formattedReturn");
const getOrders = require("./ordersTable/getOrders");
const createOrder = require("./ordersTable/createOrder");
const deleteOrder = require("./ordersTable/deleteOrder");
const updateOrder = require("./ordersTable/updateOrder");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getOrders(event);
  } else if (event.httpMethod === "POST") {
    return await createOrder(event);
  } else if (event.httpMethod === "PUT") {
    return await updateOrder(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteOrder(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
