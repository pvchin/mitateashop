const { table } = require("./airtable-deliveryperiod");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fi } = event.queryStringParameters;

  if (id) {
    const period = await table.find(id);
    const formattedPeriod = { id: period.id, ...period.fields };
    if (period.error) {
      return {
        statusCode: 404,
        body: `No Period with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedPeriod);
  }

  if (fi) {
    const period = await table
      .select({ view: "sortedview", filterByFormula: `period = '${fi}'` })
      .firstPage();
    const formattedPeriod = period.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedPeriod);
  }

  try {
    const period = await table.select({ view: "sortedview" }).firstPage();
    const formattedPeriod = period.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedPeriod);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
