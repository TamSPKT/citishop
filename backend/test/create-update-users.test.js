const { MongoClient } = require('mongodb');
const { default: UsersDAO } = require('./mockDAO/usersDAO');
require('dotenv').config();

const testData = {
  username: "test",
  password: "temp",
  email: "temp@example.com",
  sdt: "123456789",
  gioitinh: "Temp",
  ngaysinh: new Date(),
  diachi: "Sovetsky Soyuz",
  phanquyen: 1,
  passwordNew: "TempPUT",
}

describe("Create/Update User", () => {
  let connection;
  let usersDB;

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
    usersDB = await connection.db(process.env.CITISHOP_NS).collection("users")

    await UsersDAO.injectDB(connection)
  });

  afterAll(async () => {
    await usersDB.deleteMany({
      email: "temp@example.com", diachi: "Sovetsky Soyuz"
    })

    await connection.close();
    // await loaiSpDB.close();
  });

  test("Can create User", async () => {
    const postResponse = await UsersDAO.addUser(
      testData.username, testData.password, testData.email, testData.sdt,
      testData.gioitinh, testData.ngaysinh, testData.diachi, testData.phanquyen,
    )

    expect(postResponse.acknowledged).toBe(true)
    expect(postResponse.insertedId).not.toBe(null)

    const user = await UsersDAO.getUserByUsername(testData.username);

    expect(user._id).toEqual(postResponse.insertedId)
    expect(user.username).toEqual(testData.username)
    expect(user.diachi).toEqual(testData.diachi)

    testData.id = postResponse.insertedId
    // console.log(testData.id)
  });

  test("Can update User", async () => {
    const putResponse = await UsersDAO.updateUser(
      testData.username, testData.passwordNew, testData.email, testData.sdt,
      testData.gioitinh, testData.ngaysinh, testData.diachi, testData.phanquyen,
    )

    expect(putResponse.modifiedCount).toBe(1)

    const user = await UsersDAO.getUserByUsername(testData.username);

    expect(user.password).toBe(testData.passwordNew)
  });

});