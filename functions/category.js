const formattedReturn = require("./formattedReturn");
const getCategory = require("./categoryTable/getCategory");
const createCategory = require("./categoryTable/createCategory");
const deleteCategory = require("./categoryTable/deleteCategory");
const updateCategory = require("./categoryTable/updateCategory");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getCategory(event);
  } else if (event.httpMethod === "POST") {
    return await createCategory(event);
  } else if (event.httpMethod === "PUT") {
    return await updateCategory(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteCategory(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
