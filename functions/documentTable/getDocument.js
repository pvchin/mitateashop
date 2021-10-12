const { table } = require("./airtable-document");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fi} = event.queryStringParameters;

  if (id) {
    const document = await table.find(id);
    const formattedDocument = { id: document.id, ...document.fields };
    if (document.error) {
      return {
        statusCode: 404,
        body: `No Document with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedDocument);
  }

  
  try {
    const document = await table.select({ view: "sortedview" }).firstPage();
    const formattedDocument = document.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedDocument);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
