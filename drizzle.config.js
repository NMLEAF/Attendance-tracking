/** @type { import("drizzle-kit").Config } */

export default {
  schema: "./utils/schema.js",
  driver: "mysql2",
  dbCredentials: {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "attendancetrak",
  },
};
