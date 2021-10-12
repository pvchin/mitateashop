const formattedReturn = require("./formattedReturn");
const getUsers = require("./usersTable/getUsers");
const createUser = require("./usersTable/createUser");
const deleteUser = require("./usersTable/deleteUser");
const updateUser = require("./usersTable/updateUser");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getUsers(event);
  } else if (event.httpMethod === "POST") {
    return await createUser(event);
  } else if (event.httpMethod === "PUT") {
    return await updateUser(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteUser(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
