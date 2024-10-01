import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

async function createDatabaseConnection() {
  // Create a connection to the database
  const connection = await mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "attendancetrak",
  });

  // Wrap the connection with drizzle
  const db = drizzle(connection);
  console.log("Database successfully connected ✅...");

  return db;
}

// Export the database connection
export const db = createDatabaseConnection().catch((err) => {
  console.log("Failed to connect to the database:");
});
