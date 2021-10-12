const { table } = require("./airtable-users");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedUser = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedUser);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
