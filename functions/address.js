const formattedReturn = require("./formattedReturn");
const getAddress = require("./addressTable/getAddress");
const createAddress = require("./addressTable/createAddress");
const deleteAddress = require("./addressTable/deleteAddress");
const updateAddress = require("./addressTable/updateAddress");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getAddress(event);
  } else if (event.httpMethod === "POST") {
    return await createAddress(event);
  } else if (event.httpMethod === "PUT") {
    return await updateAddress(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteAddress(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
