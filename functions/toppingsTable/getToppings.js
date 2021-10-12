const { table } = require("./airtable-toppings");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id } = event.queryStringParameters;

  if (id) {
    const topping = await table.find(id);
    const formattedTopping = { id: topping.id, ...topping.fields };
    if (topping.error) {
      return {
        statusCode: 404,
        body: `No Topping with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedTopping);
  }

  try {
    const toppings = await table.select({ view: "sortedview" }).firstPage();
    const formattedToppings = toppings.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedToppings);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
