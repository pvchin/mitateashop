const { table } = require("./airtable-toppings");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdTopping = await table.create([{ fields }]);
    return formattedReturn(200, createdTopping);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
