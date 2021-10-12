const { table } = require("./airtable-address");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedAddress = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedAddress);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
