const { table } = require("./airtable-category");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedCategory = await table.destroy(id);
    return formattedReturn(200, deletedCategory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
