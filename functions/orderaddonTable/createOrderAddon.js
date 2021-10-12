const { table } = require("./airtable-orderaddon");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdOrderAddon = await table.create([{ fields }]);
    return formattedReturn(200, createdOrderAddon);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
