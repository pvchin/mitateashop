const { table } = require("./airtable-orderaddon");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedOrderAddon = await table.destroy(id);
    return formattedReturn(200, deletedOrderAddon);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
