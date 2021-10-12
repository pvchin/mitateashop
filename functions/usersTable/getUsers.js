const { table } = require("./airtable-users");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, em, tk } = event.queryStringParameters;

  if (id) {
    const user = await table.find(id);
    const formattedUser = { id: user.id, ...user.fields };
    if (user.error) {
      return {
        statusCode: 404,
        body: `No User with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedUser);
  }

  if (em) {
    const order = await table
      .select({ view: "sortedview", filterByFormula: `email = '${em}'` })
      .firstPage();
    const formattedOrder = order.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedOrder);
  }

  if (tk) {
    const order = await table
      .select({ view: "sortedview", filterByFormula: `token = '${tk}'` })
      .firstPage();
    const formattedOrder = order.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedOrder);
  }

  try {
    const users = await table.select({ view: "sortedview" }).firstPage();
    const formattedUsers = users.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedUsers);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
