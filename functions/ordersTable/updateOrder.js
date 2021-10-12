const { table } = require("./airtable-orders");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedOrder = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedOrder);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
