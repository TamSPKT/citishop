import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let sanpham // Reference to 'sanpham' database

export default class SanphamDAO {
  static async injectDB(conn) { // Initially connect to our database
    if (sanpham) { // If already has reference
      return
    }
    try { // Try to connect to our database
      sanpham = await conn.db(process.env.CITISHOP_NS).collection("sanpham")
    } catch (e) {
      console.error(
        `- Unable to establish a collection handle in SanphamDAO: ${e}`,
      )
    }
  }

  static async getSanphamList({ // Get a list of all 'sanpham' in database
    filters = null, // Filter to sort by, default to none
    page = 0, // Page number, default to 0
    sanphamPerPage = 20, // Default to 20
  } = {}) {
    let query
    if (filters) {
      if ("tenSP" in filters) { // Search by tenSP
        query = { "tenSP": { $regex: filters["tenSP"], $options: "i" } } // Case insensitive
      } else if ("hang" in filters) { // Search by hang
        query = { "hang": { $eq: filters["hang"] } }
      }
    }

    let cursor

    try {
      // Find all documents from the database that go along with the query that we passed in
      cursor = await sanpham.find(query)
    } catch (e) {
      console.error(`- Unable to issue find command, ${e}`)
      return { sanphamList: [], totalNumSP: 0 }
    }

    const displayCursor = cursor.limit(sanphamPerPage).skip(sanphamPerPage * page)

    try {
      const sanphamList = await displayCursor.toArray()
      const totalNumSP = await sanpham.countDocuments(query)

      return { sanphamList, totalNumSP }
    } catch (e) {
      console.error(
        `- Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { sanphamList: [], totalNumSP: 0 }
    }
  }

  static async getSanphamByID({
    id,
    page = 0,
    reviewsPerPage = 20
  } = { id }) {
    let minIdx = page * reviewsPerPage
    let maxIdx = (page + 1) * reviewsPerPage
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id), // Match id of certain 'sanpham'
          },
        },
        {
          $lookup: { // lookup (Part of MongoDB aggregation pipeline)
            from: "reviews",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$sanpham_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  ngayTao: -1, // Sort descending
                },
              },
            ],
            as: "reviews",
          },
        },
        {
          $addFields: { // Add new fields in the result
            reviews: {
              $slice: ["$reviews", minIdx, maxIdx] // Pagination
            },
            page: page,
            entries_per_page: reviewsPerPage,
            total_results: { $size: "$reviews" },
          },
        },
      ]
      // Return 'sanpham' with all 'reviews' connect to it
      return await sanpham.aggregate(pipeline).next()
    }
    catch (e) {
      console.error(`- Something went wrong in getSanphamByID: ${e}`)
      throw e
    }
  }

  static async addSanpham(
    tenSP, phanloai = [], giam = 0, mota, soluong = 0, hang, loaiSP_id
  ) {
    try {
      const sanphamDoc = {
        tenSP: tenSP,
        phanloai: phanloai,
        '%giam': giam,
        mota: mota,
        soluong: soluong,
        hang: hang,
        loaiSP_id: new ObjectId(loaiSP_id)
      }
      return await sanpham.insertOne(sanphamDoc) // Insert to database
    } catch (e) {
      console.error(`- Unable to post Sanpham: ${e}`)
      return { error: e }
    }
  }

  static async updateSanpham(
    sanphamID,
    tenSP, phanloai = [], giam = 0, mota, soluong = 0, hang, loaiSP_id
  ) {
    try {
      const updateResponse = await sanpham.updateOne(
        { _id: ObjectId(sanphamID) }, // Filter
        {
          $set: {
            tenSP: tenSP,
            phanloai: phanloai,
            '%giam': giam,
            mota: mota,
            soluong: soluong,
            hang: hang,
            loaiSP_id: new ObjectId(loaiSP_id)
          }
        }, // Set new values
      )
      return updateResponse
    } catch (e) {
      console.error(`- Unable to update Sanpham: ${e}`)
      return { error: e }
    }
  }

  static async deleteSanpham(sanphamID) {
    try {
      const deleteResponse = await sanpham.deleteOne(
        { _id: ObjectId(sanphamID) } // Filter
      )
      return deleteResponse
    } catch (e) {
      console.error(`- Unable to delete Sanpham: ${e}`)
      return { error: e }
    }
  }

  static async getHangList() {
    let hang = []
    try {
      // Get all distinct 'hang'
      hang = await sanpham.distinct("hang")
      return hang
    } catch (e) {
      console.error(`- Unable to get hang SP, ${e}`)
      return hang
    }
  }
}