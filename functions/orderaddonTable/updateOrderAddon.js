const { table } = require("./airtable-orderaddon");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedOrderAddon = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedOrderAddon);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
