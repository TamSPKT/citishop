const { MongoClient } = require('mongodb');
require('dotenv').config();

describe("Connection Pooling & Timeout", () => {
  let connection;

  beforeAll(async () => {
    // console.log(process.env);
    connection = await MongoClient.connect(
      process.env.CITISHOP_DB_URI,
      {
        maxPoolSize: 50, // Only 50 peoples can connect at a time
        wtimeoutMS: 2500, // Request will timeout after 2500ms
        useNewUrlParser: true // Set flag to use new connection string parser from MongoDB node.js driver
      })
    // console.log(connection.s.options.maxPoolSize)
  });

  afterAll(async () => {
    await connection.close();
    // await db.close();
  });

  test("Connection pool size is 50", async () => {
    expect(connection.s.options.maxPoolSize).toBe(50);
  });

  test("Timeout is set to 2500 milliseconds", async () => {
    expect(connection.s.options.writeConcern.wtimeout).toBe(2500)
  });
  
});