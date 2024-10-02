import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

let db; // Declare `db` as a top-level variable

// Function to create a connection and assign it to `db`
async function createDatabaseConnection() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: "root",
      password: "",
      database: "attendancetrak",
    });

    // Wrap the connection with drizzle
    db = drizzle(connection);
    console.log("Database successfully connected ✅...");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error; // Ensure the error is rethrown so it can be handled downstream
  }
}

// Immediately invoke the connection function
createDatabaseConnection();

// Export the `db` after ensuring it's initialized
export { db };
