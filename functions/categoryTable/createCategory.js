const { table } = require("./airtable-category");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdCategory = await table.create([{ fields }]);
    return formattedReturn(200, createdCategory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
