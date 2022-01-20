const { MongoClient } = require('mongodb');
const { default: SanphamDAO } = require('./mockDAO/sanphamDAO');
require('dotenv').config();

const testData = {
  tenSP: "fa-fe-fi-fo-fum",
  loai: "foo",
  gia: 10,
  hinhanh: "https://",
  giam: 5,
  mota: "foobar",
  soluong: 20,
  hang: "Temp",
  loaiSP_id: "00000000000000000000000e",
  motaNew: "Temp PUT",
}

describe("Create/Update Sanpham", () => {
  let connection;
  let sanphamDB;

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
    sanphamDB = await connection.db(process.env.CITISHOP_NS).collection("sanpham")

    await SanphamDAO.injectDB(connection)
  });

  afterAll(async () => {
    await sanphamDB.deleteMany({
      tenSP: testData.tenSP
    })

    await connection.close();
    // await loaiSpDB.close();
  });

  test("Can create Sanpham", async () => {
    const postResponse = await SanphamDAO.addSanpham(
      testData.tenSP, testData.loai, testData.gia, testData.hinhanh, testData.giam,
      testData.mota, testData.soluong, testData.hang, testData.loaiSP_id
    )

    expect(postResponse.acknowledged).toBe(true)
    expect(postResponse.insertedId).not.toBe(null)

    const sp = await SanphamDAO.getSanphamByID({ id: postResponse.insertedId });

    expect(sp._id).toEqual(postResponse.insertedId)
    expect(sp.tenSP).toEqual(testData.tenSP)
    expect(sp.mota).toEqual(testData.mota)

    testData.id = postResponse.insertedId
    // console.log(testData.id)
  });

  test("Can update Sanpham", async () => {
    const putResponse = await SanphamDAO.updateSanpham(
      testData.id,
      testData.tenSP, testData.loai, testData.gia, testData.hinhanh, testData.giam,
      testData.motaNew, testData.soluong, testData.hang, testData.loaiSP_id
    )

    expect(putResponse.modifiedCount).toBe(1)

    const sp = await SanphamDAO.getSanphamByID({ id: testData.id });

    expect(sp.mota).toBe(testData.motaNew)
  });

});