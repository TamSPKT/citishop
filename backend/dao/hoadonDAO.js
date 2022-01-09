import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let hoadon // Reference to 'hoadon' database
let sanpham // Reference to 'sanpham' database

export default class HoadonDAO {
  static async injectDB(conn) { // Initially connect to our database
    if (hoadon && sanpham) { // If already has reference
      return
    }
    try { // Try to connect to our database
      hoadon = await conn.db(process.env.CITISHOP_NS).collection("hoadon")
      sanpham = await conn.db(process.env.CITISHOP_NS).collection("sanpham")
    } catch (e) {
      console.error(
        `- Unable to establish a collection handle in HoadonDAO: ${e}`,
      )
    }
  }

  static async getHoadonList({ // Get a list of all 'hoadon' in database
    filters = null, // Filter to sort by, default to none
    page = 0, // Page number, default to 0
    hoadonPerPage = 20, // Default to 20
  } = {}) {
    let query
    if (filters) {
      if ("username" in filters) { // Hoadons by user with 'username'
        query = { "username": { $eq: filters["username"] } }
      }
    }

    let cursor

    try {
      // Find all documents from the database that go along with the query that we passed in
      cursor = await hoadon.find(query).sort({ "ngayDat": -1 })
    } catch (e) {
      console.error(`- Unable to issue find command, ${e}`)
      return { hoadonList: [], totalNumHD: 0 }
    }

    const displayCursor = cursor.limit(hoadonPerPage).skip(hoadonPerPage * page)

    try {
      const hoadonList = await displayCursor.toArray()
      const totalNumHD = await hoadon.countDocuments(query)

      return { hoadonList, totalNumHD }
    } catch (e) {
      console.error(
        `- Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { hoadonList: [], totalNumHD: 0 }
    }
  }

  static async getHoadonByID(hoadonID) {
    try {
      return await hoadon.findOne({ _id: ObjectId(hoadonID) }) // Find from database
    } catch (e) {
      console.error(`- Unable to issue findOne command, ${e}`)
      return null
    }
  }

  static async addHoadon(
    username, nguoiNhan, sdt, diachi, giamHD = 0, kieuThanhToan, sanphamList = [], stripeToken
  ) {
    try {
      let tongHD = 0
      let cthd = await Promise.all(sanphamList.map(async ({ sanphamID, soluongMua }) => {
        let sp = await sanpham.findOne(
          { _id: ObjectId(sanphamID), soluong: { $gt: soluongMua } }
        )
        if (!sp) {
          throw new Error(`Sanpham with '_id': ${sanphamID} does not exist in DB or have less than 'soluong': ${soluongMua}`)
        }
        let SPgiam = sp['%giam']
        let SPten = sp.tenSP
        let tongGia = sp.gia * soluongMua * (1 - SPgiam / 100)
        tongHD += tongGia > 0 ? tongGia : 0
        return {
          sanpham_id: ObjectId(sanphamID),
          tenSP: SPten,
          gia: sp.gia,
          giam: SPgiam,
          soluongMua: soluongMua,
          tongGia: tongGia,
        }
      }))
      // console.log(cthd)
      const hoadonDoc = {
        username: username,
        ngayDat: new Date(),
        nguoiNhan: nguoiNhan,
        sdt: sdt,
        diachi: diachi,
        "%giamHD": giamHD,
        tongHoaDon: tongHD * (1 - giamHD / 100),
        kieuThanhToan: kieuThanhToan,
        chiTietHD: cthd,
        stripeToken: stripeToken,
        trangThai: "Chờ xác nhận",
      }
      const hoadonResponse = await hoadon.insertOne(hoadonDoc)
      let sanphamResponse = {}
      if (hoadonResponse.acknowledged) {
        const sanphamsToUpdate = sanphamList.map(({ sanphamID, soluongMua }) => ({
          updateOne: {
            filter: { _id: ObjectId(sanphamID) },
            update: {
              $inc: { soluong: -soluongMua },
            },
          },
        }))
        sanphamResponse = await sanpham.bulkWrite(sanphamsToUpdate)
      }
      return { hoadonResponse, sanphamResponse }
    } catch (e) {
      console.error(`- Unable to post Hoadon: ${e}`)
      return { error: e }
    }
  }

  static async updateHoadon(
    hoadonID,
    trangThai
    // nguoiNhan, sdt, diachi, kieuThanhToan, ghichu
  ) {
    try {
      const updateResponse = await hoadon.updateOne(
        { _id: ObjectId(hoadonID) }, // Filter
        {
          $set: {
            // nguoiNhan: nguoiNhan,
            // sdt: sdt,
            // diachi: diachi,
            // kieuThanhToan: kieuThanhToan,
            // ghichu: ghichu,
            trangThai: trangThai,
          }
        }, // Set new values
      )
      return updateResponse
    } catch (e) {
      console.error(`- Unable to update Hoadon: ${e}`)
      return { error: e }
    }
  }

  static async deleteHoadon(hoadonID) {
    try {
      const deleteResponse = await hoadon.deleteOne(
        { _id: ObjectId(hoadonID) } // Filter
      )
      return deleteResponse
    } catch (e) {
      console.error(`- Unable to delete Hoadon: ${e}`)
      return { error: e }
    }
  }
}