const { table } = require("./airtable-orders");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedOrder = await table.destroy(id);
    return formattedReturn(200, deletedOrder);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
