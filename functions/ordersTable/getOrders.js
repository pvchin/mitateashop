const { table } = require("./airtable-orders");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fi, em, od } = event.queryStringParameters;

  if (id) {
    const order = await table.find(id);
    const formattedOrder = { id: order.id, ...order.fields };
    if (order.error) {
      return {
        statusCode: 404,
        body: `No Order with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedOrder);
  }

  if (fi) {
    const order = await table
      .select({ view: "sortedview", filterByFormula: `custid = '${fi}'` })
      .firstPage();
    const formattedOrder = order.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedOrder);
  }

  if (od) {
    const order = await table
      .select({
        view: "sortedview",
        filterByFormula: `AND(email="${em}", orderno="${od}")`,
      })
      // .select({ view: "sortedview", filterByFormula: `orderno = '${od}'` })
      .firstPage();
    const formattedOrder = order.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedOrder);
  }

  if (em) {
    const order = await table
      // .select({
      //   view: "sortedview",
      //   filterByFormula: `AND(email="${em}", orderno="${or}")`,
      // })
      .select({ view: "sortedview", filterByFormula: `email = '${em}'` })
      .firstPage();
    const formattedOrder = order.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedOrder);
  }

  try {
    const orders = await table.select({ view: "sortedview" }).firstPage();
    const formattedOrders = orders.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedOrders);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
