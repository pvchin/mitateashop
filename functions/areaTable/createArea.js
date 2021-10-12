const { table } = require("./airtable-area");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdArea = await table.create([{ fields }]);
    return formattedReturn(200, createdArea);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
