const { table } = require("./airtable-deliveryperiod");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedPeriod = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedPeriod);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
