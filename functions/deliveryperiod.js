const formattedReturn = require("./formattedReturn");
const getDeliveryPeriod = require("./deliveryperiodTable/getDeliveryPeriod");
const createDeliveryPeriod = require("./deliveryperiodTable/createDeliveryPeriod");
const deleteDeliveryPeriod = require("./deliveryperiodTable/deleteDeliveryPeriod");
const updateDeliveryPeriod = require("./deliveryperiodTable/updateDeliveryPeriod");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getDeliveryPeriod(event);
  } else if (event.httpMethod === "POST") {
    return await createDeliveryPeriod(event);
  } else if (event.httpMethod === "PUT") {
    return await updateDeliveryPeriod(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteDeliveryPeriod(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
