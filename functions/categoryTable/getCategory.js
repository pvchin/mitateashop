const { table } = require("./airtable-category");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fi } = event.queryStringParameters;

  if (id) {
    const category = await table.find(id);
    const formattedArea = { id: category.id, ...category.fields };
    if (category.error) {
      return {
        statusCode: 404,
        body: `No Category with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedArea);
  }

  if (fi) {
    const category = await table
      .select({ view: "sortedview", filterByFormula: `name = '${fi}'` })
      .firstPage();
    const formattedCategory = category.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedCategory);
  }

  try {
    const category = await table.select({ view: "sortedview" }).firstPage();
    const formattedCategory = category.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedCategory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
