const { table } = require("./airtable-area");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedArea = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedArea);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
