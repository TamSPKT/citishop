const { MongoClient } = require('mongodb');
const { default: HoadonDAO } = require('./mockDAO/hoadonDAO');
const { default: KhuyenmaiDAO } = require('./mockDAO/khuyenmaiDAO');
const { default: LoaiSpDAO } = require('./mockDAO/loaiSpDAO');
const { default: SanphamDAO } = require('./mockDAO/sanphamDAO');
const { default: UsersDAO } = require('./mockDAO/usersDAO');
require('dotenv').config();

const badObjectId = "00000000000000000000000e"

describe("Handle error from getting data", () => {
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
    // console.log(connection.s.options)
    await LoaiSpDAO.injectDB(connection)
    await UsersDAO.injectDB(connection)
    await SanphamDAO.injectDB(connection)
    await KhuyenmaiDAO.injectDB(connection)
    await HoadonDAO.injectDB(connection)
  });

  afterAll(async () => {
    await connection.close();
    // await db.close();
  });

  test("Handles invalid LoaiSp ID error", async () => {
    const response = await LoaiSpDAO.getLoaiSpByID({ id: badObjectId });
    expect(response).toBeNull()
  });

  test("Handles invalid Sanpham ID error", async () => {
    const response = await SanphamDAO.getSanphamByID({ id: badObjectId });
    expect(response).toBeNull()
  });

  test("Handles invalid User ID error", async () => {
    const response = await UsersDAO.getUserByID(badObjectId);
    expect(response).toBeNull()
  });

  test("Handles invalid Khuyenmai ID error", async () => {
    const response = await KhuyenmaiDAO.getKhuyenmaiByID(badObjectId);
    expect(response).toBeNull()
  });

  test("Handles invalid Hoadon ID error", async () => {
    const response = await HoadonDAO.getHoadonByID(badObjectId);
    expect(response).toBeNull()
  });

});