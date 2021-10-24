const { table } = require("./airtable-category");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedCategory = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedCategory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
