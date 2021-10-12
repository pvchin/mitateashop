const { table } = require("./airtable-orderitems");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fi } = event.queryStringParameters;

  if (id) {
    const orderitem = await table.find(id);
    const formattedOrderItem = { id: orderitem.id, ...orderitem.fields };
    if (orderitem.error) {
      return {
        statusCode: 404,
        body: `No Order Item with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedOrderItem);
  }

if (fi) {
  const orderitems = await table
    .select({ view: "sortedview", filterByFormula: `orderno = '${fi}'` })
    .firstPage();
  const formattedOrderItems = orderitems.map((rec) => ({
    id: rec.id,
    ...rec.fields,
  }));

  return formattedReturn(200, formattedOrderItems);
}


  try {
    const orderitems = await table.select({ view: "sortedview" }).firstPage();
    const formattedOrderItems = orderitems.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedOrderItems);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
