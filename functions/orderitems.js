const formattedReturn = require("./formattedReturn");
const getOrderItems = require("./orderitemsTable/getOrderItems");
const createOrderItem = require("./orderitemsTable/createOrderItem");
const deleteOrderItem = require("./orderitemsTable/deleteOrderItem");
const updateOrderItem = require("./orderitemsTable/updateOrderItem");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getOrderItems(event);
  } else if (event.httpMethod === "POST") {
    return await createOrderItem(event);
  } else if (event.httpMethod === "PUT") {
    return await updateOrderItem(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteOrderItem(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
