const formattedReturn = require("./formattedReturn");
const getDocument = require("./documentTable/getDocument");
const createDocument = require("./documentTable/createDocument");
const deleteDocument = require("./documentTable/deleteDocument");
const updateDocument = require("./documentTable/updateDocument");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getDocument(event);
  } else if (event.httpMethod === "POST") {
    return await createDocument(event);
  } else if (event.httpMethod === "PUT") {
    return await updateDocument(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteDocument(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
