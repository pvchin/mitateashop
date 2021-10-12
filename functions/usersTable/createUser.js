const { table } = require("./airtable-users");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdUser = await table.create([{ fields }]);
    return formattedReturn(200, createdUser);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
