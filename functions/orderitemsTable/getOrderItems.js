const { table } = require("./airtable-orderitems");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fi, al } = event.queryStringParameters;

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

  if (al) {
    let records = [];

    // called for every page of records
    const processPage = (partialRecords, fetchNextPage) => {
      records = [...records, ...partialRecords];
      fetchNextPage();
    };

    // called when all the records have been retrieved
    const processRecords = (err) => {
      if (err) {
        console.error(err);
        return;
      }

      //process the `records` array and do something with it
      const formattedOrderItems = processRecords.map((rec) => ({
        id: rec.id,
        ...rec.fields,
      }));

      return formattedReturn(200, formattedOrderItems);
    };
    table
      .select({
        view: "sortedview",
      })
      .eachPage(processPage, processRecords);
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
