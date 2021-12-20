import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let hoadon // Reference to 'hoadon' database
let sanpham // Reference to 'sanpham' database
let users // Reference to 'users' database
let khuyenmai // Reference to 'khuyenmai' database
let reviews // Reference to 'reviews' database

export default class ThongkeDAO {
  static async injectDB(conn) { // Initially connect to our database
    if (hoadon && sanpham && users && khuyenmai && reviews) { // If already has reference
      return
    }
    try { // Try to connect to our database
      hoadon = await conn.db(process.env.CITISHOP_NS).collection("hoadon")
      sanpham = await conn.db(process.env.CITISHOP_NS).collection("sanpham")
      users = await conn.db(process.env.CITISHOP_NS).collection("users")
      khuyenmai = await conn.db(process.env.CITISHOP_NS).collection("khuyenmai")
      reviews = await conn.db(process.env.CITISHOP_NS).collection("reviews")
    } catch (e) {
      console.error(
        `- Unable to establish a collection handle in ThongkeDAO: ${e}`,
      )
    }
  }

  static async thongkeHoadonsByMonths( // Get a list of all 'hoadon' in database group by 'ngayDat'
    numMonths = 1, // Hoadons with 'ngayDat' in n months from current month
  ) {
    try {
      const date = new Date()
      const firstDay = new Date(date.getFullYear(), date.getMonth() - numMonths, 1) // First day of current month
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0) // Last day of current month
      const pipeline = [
        {
          $match: {
            ngayDat: {
              $gte: firstDay, $lte: lastDay,
            }
          }
        },
        {
          $addFields: {
            createdDate: {
              $dateToString: {
                format: "%Y-%m-%d", // YYYY-MM-DD
                date: "$ngayDat",
              }
            }
          }
        },
        {
          $group: {
            _id: "$createdDate",
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 } // Ascending
        }
      ]
      // Return 'hoadon' in n months from current month
      return await hoadon.aggregate(pipeline).toArray()
    } catch (e) {
      console.error(`- Something went wrong in thongkeHoadon: ${e}`)
      throw e
    }
  }

  static async thongkeSanphamsByHang() {
    try {
      const pipeline = [
        {
          $group: {
            _id: '$hang',
            count: {
              $sum: 1
            }
          }
        },
        {
          $sort: { _id: 1 } // Ascending
        }
      ]
      // Return 'hoadon' in n months from current month
      return await sanpham.aggregate(pipeline).toArray()
    } catch (e) {
      console.error(`- Something went wrong in thongkeSanphamsByHang: ${e}`)
      throw e
    }
  }

  static async thongkeSanphamsByGia() {
    try {
      const pipeline = [
        {
          $group: {
            _id: '$gia',
            count: { $sum: 1 }
          }
        }, {
          $sort: { _id: 1 } // Ascending
        }
      ]
      // Return 'hoadon' in n months from current month
      return await sanpham.aggregate(pipeline).toArray()
    } catch (e) {
      console.error(`- Something went wrong in thongkeSanphamsByHang: ${e}`)
      throw e
    }
  }

  static async thongkeKhuyenmais() {
    const pastQuery = {
      ngayKetThuc: { $lt: new Date() }
    }
    const currentQuery = {
      ngayBatDau: { $lt: new Date() },
      ngayKetThuc: { $gt: new Date() },
    }
    const futureQuery = {
      ngayBatDau: { $gt: new Date() }
    }
    try {
      const numPastKM = await khuyenmai.countDocuments(pastQuery)
      const numCurrentKM = await khuyenmai.countDocuments(currentQuery)
      const numFutureKM = await khuyenmai.countDocuments(futureQuery)

      return { numPastKM, numCurrentKM, numFutureKM }
    } catch (e) {
      console.error(
        `- Problem counting documents in thongkeKhuyenmais, ${e}`,
      )
      return { numPastKM: 0, numCurrentKM: 0, numFutureKM: 0 }
    }
  }

  static async thongkeReviews() {
    const query = {}
    try {
      const totalReviews = await reviews.countDocuments(query)
      return { totalReviews }
    } catch (e) {
      console.error(
        `- Problem counting documents in thongkeReviews, ${e}`,
      )
      return { totalReviews: 0 }
    }
  }

  static async thongkeUsers() {
    const query = {}
    try {
      const totalUsers = await users.countDocuments(query)
      return { totalUsers }
    } catch (e) {
      console.error(
        `- Problem counting documents in thongkeUsers, ${e}`,
      )
      return { totalUsers: 0 }
    }
  }
}