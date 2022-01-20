const { MongoClient } = require('mongodb');
const { default: KhuyenmaiDAO } = require('./mockDAO/khuyenmaiDAO');
require('dotenv').config();

const testData = {
  tenKhuyenMai: "Test",
  giam: 10,
  hoaDonTriGia: 20000,
  ngayBatDau: new Date('2022-01-19'),
  ngayKetThuc: new Date('2022-01-20'),
  giamNew: 20,
}

describe("Create/Update Khuyenmai", () => {
  let connection;
  let khuyenmaiDB;

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
    khuyenmaiDB = await connection.db(process.env.CITISHOP_NS).collection("khuyenmai")

    await KhuyenmaiDAO.injectDB(connection)
  });

  afterAll(async () => {
    await khuyenmaiDB.deleteMany({
      tenKhuyenMai: testData.tenKhuyenMai,
      hoaDonTriGia: testData.hoaDonTriGia,
    })

    await connection.close();
    // await loaiSpDB.close();
  });

  test("Can create Khuyenmai", async () => {
    const postResponse = await KhuyenmaiDAO.addKhuyenmai(
      testData.tenKhuyenMai, testData.giam, testData.hoaDonTriGia, testData.ngayBatDau, testData.ngayKetThuc
    )

    expect(postResponse.acknowledged).toBe(true)
    expect(postResponse.insertedId).not.toBe(null)

    const km = await KhuyenmaiDAO.getKhuyenmaiByID(postResponse.insertedId);

    expect(km._id).toEqual(postResponse.insertedId)
    expect(km.tenKhuyenMai).toEqual(testData.tenKhuyenMai)
    expect(km.hoaDonTriGia).toEqual(testData.hoaDonTriGia)

    testData.id = postResponse.insertedId
    // console.log(testData.id)
  });

  test("Can update User", async () => {
    const putResponse = await KhuyenmaiDAO.updateKhuyenmai(
      testData.id,
      testData.tenKhuyenMai, testData.giamNew, testData.hoaDonTriGia, testData.ngayBatDau, testData.ngayKetThuc
    )

    expect(putResponse.modifiedCount).toBe(1)

    const km = await KhuyenmaiDAO.getKhuyenmaiByID(testData.id);

    expect(km['%giam']).toBe(testData.giamNew)
  });

});