const { table } = require("./airtable-address");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedAddress = await table.destroy(id);
    return formattedReturn(200, deletedAddress);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
