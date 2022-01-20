const { MongoClient } = require('mongodb');
const { default: LoaiSpDAO } = require('./mockDAO/loaiSpDAO');
require('dotenv').config();

const testData = {
  tenloaiSP: "fa-fe-fi-fo-fum",
  mota: "foobar",
  motaNew: "Temp PUT",
}

describe("Create/Update LoaiSp", () => {
  let connection;
  let loaiSpDB;

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
    loaiSpDB = await connection.db(process.env.CITISHOP_NS).collection("loaiSP")

    await LoaiSpDAO.injectDB(connection)
  });

  afterAll(async () => {
    await loaiSpDB.deleteMany({
      tenloaiSP: testData.tenloaiSP
    })

    await connection.close();
    // await loaiSpDB.close();
  });

  test("Can create LoaiSp", async () => {
    const postResponse = await LoaiSpDAO.addLoaiSp(testData.tenloaiSP, testData.mota)

    expect(postResponse.acknowledged).toBe(true)
    expect(postResponse.insertedId).not.toBe(null)

    const loaisp = await LoaiSpDAO.getLoaiSpByID({ id: postResponse.insertedId });

    expect(loaisp._id).toEqual(postResponse.insertedId)
    expect(loaisp.tenloaiSP).toEqual(testData.tenloaiSP)
    expect(loaisp.mota).toEqual(testData.mota)

    testData.id = postResponse.insertedId
    // console.log(testData.id)
  });

  test("Can update LoaiSp", async () => {
    const putResponse = await LoaiSpDAO.updateLoaiSp(testData.id, testData.tenloaiSP, testData.motaNew)

    expect(putResponse.modifiedCount).toBe(1)

    const loaisp = await LoaiSpDAO.getLoaiSpByID({ id: testData.id });

    expect(loaisp.mota).toBe(testData.motaNew)
  });

});