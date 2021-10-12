const { table } = require("./airtable-orderitems");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedOrderItem = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedOrderItem);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
