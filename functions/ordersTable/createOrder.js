const { table } = require("./airtable-orders");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdOrder = await table.create([{ fields }]);
    return formattedReturn(200, createdOrder);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
