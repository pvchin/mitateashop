const { table } = require("./airtable-deliveryperiod");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdPeriod = await table.create([{ fields }]);
    return formattedReturn(200, createdPeriod);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
