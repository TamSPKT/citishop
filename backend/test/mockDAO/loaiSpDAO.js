// import mongodb from "mongodb"
const ObjectId = require("mongodb").ObjectId
let loaiSp // Reference to 'loaiSP' database

export default class LoaiSpDAO {
  static async injectDB(conn) { // Initially connect to our database
    if (loaiSp) { // If already has reference
      return
    }
    try { // Try to connect to our database
      loaiSp = await conn.db(process.env.CITISHOP_NS).collection("loaiSP")
    } catch (e) {
      console.error(
        `- Unable to establish a collection handle in LoaiSpDAO: ${e}`,
      )
    }
  }

  static async getLoaiSpList({ // Get a list of all 'loaiSP' in database
    filters = null, // Filter to sort by, default to none
    page = 0, // Page number, default to 0
    loaiSpPerPage = 20, // Default to 20
  } = {}) {
    let query
    if (filters) {
      if ("tenloaiSP" in filters) { // Search by tenloaiSP
        query = { "tenloaiSP": { $regex: filters["tenloaiSP"], $options: "i" } } // Case insensitive
      } else if ("mota" in filters) { // Search by mota
        query = { "mota": { $regex: filters["mota"], $options: "i" } } // Case insensitive
      }
    }

    let cursor

    try {
      // Find all documents from the database that go along with the query that we passed in
      cursor = await loaiSp.find(query)
    } catch (e) {
      console.error(`- Unable to issue find command, ${e}`)
      return { LoaiSpList: [], totalNumLoaiSp: 0 }
    }

    const displayCursor = cursor.limit(loaiSpPerPage).skip(loaiSpPerPage * page)

    try {
      const LoaiSpList = await displayCursor.toArray()
      const totalNumLoaiSp = await loaiSp.countDocuments(query)

      return { LoaiSpList, totalNumLoaiSp }
    } catch (e) {
      console.error(
        `- Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { LoaiSpList: [], totalNumLoaiSp: 0 }
    }
  }

  static async getLoaiSpByID({
    id,
    page = 0,
    sanphamPerPage = 20
  } = { id }) {
    let minIdx = page * sanphamPerPage
    let maxIdx = (page + 1) * sanphamPerPage
    try {
      // In MongoDB, can create pipeline to help match different collections together
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id), // Match id of certain LoaiSp
          },
        },
        {
          $lookup: { // lookup (Part of MongoDB aggregation pipeline)
            from: "sanpham",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$loaiSP_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  tenSP: 1, // Sort ascending
                },
              },
            ],
            as: "sanphamList",
          },
        },
        {
          $addFields: { // Add new fields in the result
            sanphamList: {
              $slice: ["$sanphamList", minIdx, maxIdx] // Pagination
            },
            page: page,
            entries_per_page: sanphamPerPage,
            total_results: { $size: "$sanphamList" },
          },
        },
      ]
      // Return 'loaiSP' with all 'sanpham' connect to it
      return await loaiSp.aggregate(pipeline).next()
    } catch (e) {
      console.error(`- Something went wrong in getLoaiSpByID: ${e}`)
      throw e
    }
  }

  static async addLoaiSp(tenloaiSP, mota) {
    try {
      const loaiSpDoc = {
        tenloaiSP: tenloaiSP,
        mota: mota,
      }
      return await loaiSp.insertOne(loaiSpDoc) // Insert to database
    } catch (e) {
      console.error(`- Unable to post LoaiSp: ${e}`)
      return { error: e }
    }
  }

  static async updateLoaiSp(loaiSpID, tenloaiSP, mota) {
    try {
      const updateResponse = await loaiSp.updateOne(
        { _id: ObjectId(loaiSpID) }, // Filter
        { $set: { tenloaiSP: tenloaiSP, mota: mota } }, // Set new 'tenloaiSp' and 'mota'
      )
      return updateResponse
    } catch (e) {
      console.error(`- Unable to update LoaiSp: ${e}`)
      return { error: e }
    }
  }

  static async deleteLoaiSp(loaiSpID) {
    try {
      const deleteResponse = await loaiSp.deleteOne(
        { _id: ObjectId(loaiSpID) } // Filter
      )
      return deleteResponse
    } catch (e) {
      console.error(`- Unable to delete LoaiSp: ${e}`)
      return { error: e }
    }
  }
}