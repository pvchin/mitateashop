const { table } = require("./airtable-orderitems");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdOrderItem = await table.create([{ fields }]);
    return formattedReturn(200, createdOrderItem);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
