const environment = process.env.NODE_ENV || "development";
const config = require("../knexfile.js")[environment];
const database = require("knex")(config);
module.exports = database;
// const database = knex(config[environment]);
// module.exports = database;

// knex("task_table").select("*");
