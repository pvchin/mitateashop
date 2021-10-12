const { table } = require("./airtable-orderaddon");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fi } = event.queryStringParameters;

  if (id) {
    const orderaddon = await table.find(id);
    const formattedOrderAddon = { id: orderaddon.id, ...orderaddon.fields };
    if (orderaddon.error) {
      return {
        statusCode: 404,
        body: `No Order Addon with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedOrderAddon);
  }

  if (fi) {
    const orderaddon = await table
      .select({ view: "sortedview", filterByFormula: `orderno = '${fi}'` })
      .firstPage();
    const formattedOrderAddon = orderaddon.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedOrderAddon);
  }

  try {
    const orderaddon = await table.select({ view: "sortedview" }).firstPage();
    const formattedOrderAddon = orderaddon.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedOrderAddon);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
