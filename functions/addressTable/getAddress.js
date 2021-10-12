const { table } = require("./airtable-address");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fi } = event.queryStringParameters;

  if (id) {
    const address = await table.find(id);
    const formattedAddress = { id: address.id, ...address.fields };
    if (address.error) {
      return {
        statusCode: 404,
        body: `No Address with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedAddress);
  }

    if (fi) {
      const address = await table
        .select({ view: "sortedview", filterByFormula: `userid = '${fi}'` })
        .firstPage();
      const formattedAddress = address.map((rec) => ({
        id: rec.id,
        ...rec.fields,
      }));

      return formattedReturn(200, formattedAddress);
    }

  try {
    const address = await table.select({ view: "sortedview" }).firstPage();
    const formattedAddress = address.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedAddress);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
