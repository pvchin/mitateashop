const { table } = require("./airtable-users");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedUser = await table.destroy(id);
    return formattedReturn(200, deletedUser);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
