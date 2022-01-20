const { MongoClient } = require('mongodb');
const { default: HoadonDAO } = require('./mockDAO/hoadonDAO');
const { default: KhuyenmaiDAO } = require('./mockDAO/khuyenmaiDAO');
const { default: LoaiSpDAO } = require('./mockDAO/loaiSpDAO');
const { default: SanphamDAO } = require('./mockDAO/sanphamDAO');
const { default: UsersDAO } = require('./mockDAO/usersDAO');
require('dotenv').config();

const itemsPerPage = 10;

describe("Paging", () => {
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

  test("Paging support for LoaiSp", async () => {
    const { LoaiSpList, totalNumLoaiSp } = await LoaiSpDAO.getLoaiSpList({ loaiSpPerPage: itemsPerPage });
    expect(LoaiSpList.length).toBeLessThanOrEqual(itemsPerPage);
  });

  test("Paging support for Sanpham", async () => {
    const { sanphamList, totalNumSP } = await SanphamDAO.getSanphamList({ sanphamPerPage: itemsPerPage });
    expect(sanphamList.length).toBeLessThanOrEqual(itemsPerPage);
  });

  test("Paging support for User", async () => {
    const { usersList, totalNumUsers } = await UsersDAO.getUsersList({ usersPerPage: itemsPerPage });
    expect(usersList.length).toBeLessThanOrEqual(itemsPerPage);
  });

  test("Paging support for Khuyenmai", async () => {
    const { khuyenmaiList, totalNumKM } = await KhuyenmaiDAO.getKhuyenmaiList({ khuyenmaiPerPage: itemsPerPage });
    expect(khuyenmaiList.length).toBeLessThanOrEqual(itemsPerPage);
  });

  test("Paging support for Hoadon", async () => {
    const { hoadonList, totalNumHD } = await HoadonDAO.getHoadonList({ hoadonPerPage: itemsPerPage });
    expect(hoadonList.length).toBeLessThanOrEqual(itemsPerPage);
  });

});