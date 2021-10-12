const { table } = require("./airtable-area");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fi } = event.queryStringParameters;

  if (id) {
    const area = await table.find(id);
    const formattedArea = { id: area.id, ...area.fields };
    if (area.error) {
      return {
        statusCode: 404,
        body: `No Area with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedArea);
  }

  if (fi) {
    const area = await table
      .select({ view: "sortedview", filterByFormula: `area = '${fi}'` })
      .firstPage();
    const formattedArea = area.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedArea);
  }

  try {
    const area = await table.select({ view: "sortedview" }).firstPage();
    const formattedArea = area.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedArea);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
