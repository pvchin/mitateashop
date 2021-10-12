const { table } = require("./airtable-area");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedArea = await table.destroy(id);
    return formattedReturn(200, deletedArea);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
