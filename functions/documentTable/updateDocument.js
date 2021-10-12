const { table } = require("./airtable-document");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedDocument = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedDocument);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
