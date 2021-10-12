const formattedReturn = require("./formattedReturn");
const getOrderAddon = require("./orderaddonTable/getOrderAddon");
const createOrderAddon = require("./orderaddonTable/createOrderAddon");
const deleteOrderAddon = require("./orderaddonTable/deleteOrderAddon");
const updateOrderAddon = require("./orderaddonTable/updateOrderAddon");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getOrderAddon(event);
  } else if (event.httpMethod === "POST") {
    return await createOrderAddon(event);
  } else if (event.httpMethod === "PUT") {
    return await updateOrderAddon(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteOrderAddon(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
