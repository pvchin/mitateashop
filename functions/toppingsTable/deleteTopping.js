const { table } = require("./airtable-toppings");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedTopping = await table.destroy(id);
    return formattedReturn(200, deletedTopping);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
