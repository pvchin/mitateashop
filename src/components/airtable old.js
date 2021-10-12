// utils/airtable.js

// const Airtable = require("airtable");
// const { AIRTABLE_API_ID, AIRTABLE_BASE_ID } = process.env;
// const base = new Airtable({ apiKey: AIRTABLE_API_ID }).base(AIRTABLE_BASE_ID);
// const formattedReturn = require("./formattedReturn");

// const table = base("items");

// const getAllItems = async () => {
//   try {
//     const items = await table.select().firstPage();
//     const formattedItems = items.map((rec) => ({
//       id: rec.id,
//       ...rec.fields,
//     }));

//     return formattedReturn(200, formattedItems);
//   } catch (err) {
//     console.error(err);
//     return formattedReturn(500, {});
//   }
// };

// const transformResponse = (id, fields) => ({
//   id,
//   ...fields,
// });

// exports.getAllItems = getAllItems;
// //exports.addProject = addProject;
