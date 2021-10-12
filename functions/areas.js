const formattedReturn = require("./formattedReturn");
const getArea = require("./areaTable/getArea");
const createArea = require("./areaTable/createArea");
const deleteArea = require("./areaTable/deleteArea");
const updateArea = require("./areaTable/updateArea");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getArea(event);
  } else if (event.httpMethod === "POST") {
    return await createArea(event);
  } else if (event.httpMethod === "PUT") {
    return await updateArea(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteArea(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
