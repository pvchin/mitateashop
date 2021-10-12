const { table } = require("./airtable-items");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id } = event.queryStringParameters;

  if (id) {
    const item = await table.find(id);
    const formattedItem = { id: item.id, ...item.fields };
    if (item.error) {
      return {
        statusCode: 404,
        body: `No Item with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedItem);
  }

  try {
    const items = await table.select({view: "sortedview"}).firstPage();
    const formattedItems = items.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedItems);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
