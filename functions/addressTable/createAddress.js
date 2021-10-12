const { table } = require("./airtable-address");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdAddress = await table.create([{ fields }]);
    return formattedReturn(200, createdAddress);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
