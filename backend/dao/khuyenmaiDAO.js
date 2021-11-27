import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let khuyenmai // Reference to 'khuyenmai' database

export default class KhuyenmaiDAO {
  static async injectDB(conn) { // Initially connect to our database
    if (khuyenmai) { // If already has reference
      return
    }
    try { // Try to connect to our database
      khuyenmai = await conn.db(process.env.CITISHOP_NS).collection("khuyenmai")
    } catch (e) {
      console.error(
        `- Unable to establish a collection handle in SanphamDAO: ${e}`,
      )
    }
  }

  static async getKhuyenmaiList({ // Get a list of all 'khuyenmai' in database
    filters = null, // Filter to sort by, default to none
    page = 0, // Page number, default to 0
    khuyenmaiPerPage = 20, // Default to 20
  } = {}) {
    let query
    if (filters) {
      if ("tenKhuyenMai" in filters) { // Search by tenKhuyenMai
        query = { "tenKhuyenMai": { $regex: filters["tenKhuyenMai"], $options: "i" } } // Case insensitive
      } else if ("hoaDonTriGiaTren" in filters && "ngay" in filters) {
        query = {
          $and: [
            { "hoaDonTriGia": { $lte: Number(filters["hoaDonTriGiaTren"]) } }, // Greater than or equal 'hoaDonTriGia'
            { "ngayBatDau": { $lt: new Date(filters["ngay"]) } }, // After 'ngayBatDau'
            { "ngayKetThuc": { $gt: new Date(filters["ngay"]) } }// Before 'ngayKetThuc'
          ]
        }
      } else if ("hoaDonTriGiaTren" in filters) { // Greater than or equal
        query = { "hoaDonTriGia": { $lte: Number(filters["hoaDonTriGiaTren"]) } }
      }
    }

    let cursor

    try {
      // Find all documents from the database that go along with the query that we passed in
      cursor = await khuyenmai.find(query)
    } catch (e) {
      console.error(`- Unable to issue find command, ${e}`)
      return { khuyenmaiList: [], totalNumKM: 0 }
    }

    const displayCursor = cursor.limit(khuyenmaiPerPage).skip(khuyenmaiPerPage * page)

    try {
      const khuyenmaiList = await displayCursor.toArray()
      const totalNumKM = await khuyenmai.countDocuments(query)

      return { khuyenmaiList, totalNumKM }
    } catch (e) {
      console.error(
        `- Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { khuyenmaiList: [], totalNumKM: 0 }
    }
  }

  static async getKhuyenmaiByID(khuyenmaiID) {
    try {
      return await khuyenmai.findOne({ _id: ObjectId(khuyenmaiID) }) // Find from database
    } catch (e) {
      console.error(`- Unable to issue findOne command, ${e}`)
      return null
    }
  }

  static async addKhuyenmai(
    tenKhuyenMai, giam = 0, hoaDonTriGia = 1, ngayBatDau, ngayKetThuc
  ) {
    try {
      const khuyenmaiDoc = {
        tenKhuyenMai: tenKhuyenMai,
        '%giam': giam,
        hoaDonTriGia: hoaDonTriGia,
        ngayBatDau: new Date(ngayBatDau),
        ngayKetThuc: new Date(ngayKetThuc),
      }
      return await khuyenmai.insertOne(khuyenmaiDoc) // Insert to database
    } catch (e) {
      console.error(`- Unable to post Khuyenmai: ${e}`)
      return { error: e }
    }
  }

  static async updateKhuyenmai(
    khuyenmaiID,
    tenKhuyenMai, giam = 0, hoaDonTriGia = 1, ngayBatDau, ngayKetThuc
  ) {
    try {
      const updateResponse = await khuyenmai.updateOne(
        { _id: ObjectId(khuyenmaiID) }, // Filter
        {
          $set: {
            tenKhuyenMai: tenKhuyenMai,
            '%giam': giam,
            hoaDonTriGia: hoaDonTriGia,
            ngayBatDau: new Date(ngayBatDau),
            ngayKetThuc: new Date(ngayKetThuc),
          }
        }, // Set new values
      )
      return updateResponse
    } catch (e) {
      console.error(`- Unable to update Khuyenmai: ${e}`)
      return { error: e }
    }
  }

  static async deleteKhuyenmai(khuyenmaiID) {
    try {
      const deleteResponse = await khuyenmai.deleteOne(
        { _id: ObjectId(khuyenmaiID) } // Filter
      )
      return deleteResponse
    } catch (e) {
      console.error(`- Unable to delete Khuyenmai: ${e}`)
      return { error: e }
    }
  }
}