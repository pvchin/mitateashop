const { table } = require("./airtable-orderitems");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedOrderItem = await table.destroy(id);
    return formattedReturn(200, deletedOrderItem);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
