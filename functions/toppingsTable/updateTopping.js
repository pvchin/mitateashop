const { table } = require("./airtable-toppings");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedTopping = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedTopping);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
