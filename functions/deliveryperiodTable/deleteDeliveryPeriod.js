const { table } = require("./airtable-deliveryperiod");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedPeriod = await table.destroy(id);
    return formattedReturn(200, deletedPeriod);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
