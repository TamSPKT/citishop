const { MongoClient } = require('mongodb');
const { default: HoadonDAO } = require('./mockDAO/hoadonDAO.js');
const { default: KhuyenmaiDAO } = require('./mockDAO/khuyenmaiDAO.js');
const { default: LoaiSpDAO } = require('./mockDAO/loaiSpDAO.js');
const { default: SanphamDAO } = require('./mockDAO/sanphamDAO.js');
const { default: UsersDAO } = require('./mockDAO/usersDAO.js');
require('dotenv').config();

describe("Connection", () => {
  let connection;
  let db;

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
    db = await connection.db(process.env.CITISHOP_NS)

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

  test("Can access CITISHOP data", async () => {
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map(elem => elem.name)
    expect(collectionNames).toContain("hoadon")
    expect(collectionNames).toContain("khuyenmai")
    expect(collectionNames).toContain("loaiSP")
    expect(collectionNames).toContain("reviews")
    expect(collectionNames).toContain("sanpham")
    expect(collectionNames).toContain("users")
  });

  test("Can retrieve a Hoadon by ID", async () => {
    const id = "61dac4539e28137269c4810e";
    const response = await HoadonDAO.getHoadonByID(id);
    expect(response).not.toBeNull();
    expect(response.tongHoaDon).toBe(280000);
  });

  test("Can retrieve a Khuyenmai by ID", async () => {
    const id = "619e63e4af62dc953b3e8f07";
    const response = await KhuyenmaiDAO.getKhuyenmaiByID(id);
    expect(response).not.toBeNull();
    expect(response.tenKhuyenMai).toBe("Testing");
  });

  test("Can retrieve a LoaiSp by ID", async () => {
    const id = "61741b4ac27466f9251d34bd";
    const response = await LoaiSpDAO.getLoaiSpByID({ id, sanphamPerPage: 1 });
    expect(response).not.toBeNull();
    expect(response.tenloaiSP).toBe("Sữa rửa mặt");
  });

  test("Can retrieve a Sanpham by ID", async () => {
    const id = "61741bb4c27466f9251d34c0";
    const response = await SanphamDAO.getSanphamByID({ id, reviewsPerPage: 1 });
    expect(response).not.toBeNull();
    expect(response.tenSP).toBe("Sữa rửa mặt Cetaphil Gentle Skin Cleanser");
  });

  test("Can retrieve a User by ID", async () => {
    const id = "616e3f9d8a778501aeb94805";
    const response = await UsersDAO.getUserByID(id);
    expect(response).not.toBeNull();
    expect(response.email).toBe("18110359@student.hcmute.edu.vn");
  });

})
