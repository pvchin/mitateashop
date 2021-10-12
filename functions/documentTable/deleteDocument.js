const { table } = require("./airtable-document");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedDocument = await table.destroy(id);
    return formattedReturn(200, deletedDocument);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
