const { table } = require("./airtable-document");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdDocument = await table.create([{ fields }]);
    return formattedReturn(200, createdDocument);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
