import HoadonDAO from "../dao/hoadonDAO.js";

export default class HoadonController {
  static async apiGetHoadonList(req, res, next) {
    // Check if hoadonPerPage exists in URL
    const hoadonPerPage = req.query.hoadonPerPage ? parseInt(req.query.hoadonPerPage, 10) : 20
    // Check if page number exists in URL
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.username) { // If 'username' in query
      filters.username = req.query.username
    }

    const { hoadonList, totalNumHD } = await HoadonDAO.getHoadonList({
      filters,
      page,
      hoadonPerPage
    })

    let response = {
      hoadon: hoadonList,
      page: page,
      filters: filters,
      entries_per_page: hoadonPerPage,
      total_results: totalNumHD,
    }
    res.json(response)
  }

  static async apiGetHoadonByID(req, res, next) {
    try {
      // id from parameter in URL "/:id"
      let id = req.params.id || {}

      const hoadon = await HoadonDAO.getHoadonByID(id)

      if (!hoadon) {
        res.status(404).json({ error: "Not found" })
        return
      }

      res.json(hoadon)
    } catch (e) {
      console.log(`- apiGetHoadonByID, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiPostHoadon(req, res, next) {
    try {
      // Get info from the body of the request
      const username = req.body.username
      const nguoiNhan = req.body.nguoiNhan
      const sdt = req.body.sdt
      const diachi = req.body.diachi
      const giamHD = req.body.giamHD
      const kieuThanhToan = req.body.kieuThanhToan
      const sanphamList = req.body.sanphamList
      const stripeToken = req.body.stripeToken

      // Send to HoadonDAO.addHoadon(...)
      const hoadonResponse = await HoadonDAO.addHoadon(
        username, nguoiNhan, sdt, diachi, giamHD, kieuThanhToan, sanphamList, stripeToken
      )
      // Return success if it's worked
      res.json({ status: "success", response: hoadonResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateHoadon(req, res, next) {
    try {
      // id from parameter in URL "/:id"
      let hoadonID = req.params.id || {}
      // Get info from the body of the request
      const trangThai = req.body.trangThai
      // const nguoiNhan = req.body.nguoiNhan
      // const sdt = req.body.sdt
      // const diachi = req.body.diachi
      // const kieuThanhToan = req.body.kieuThanhToan
      // const ghichu = req.body.ghichu

      // Send to HoadonDAO.updateHoadon(...)
      const hoadonResponse = await HoadonDAO.updateHoadon(
        hoadonID,
        trangThai
        //nguoiNhan, sdt, diachi, kieuThanhToan, ghichu
      )

      var { error } = hoadonResponse
      if (error) { // Check error
        res.status(400).json({ error })
        return
      }

      res.json({ status: "success", response: hoadonResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteHoadon(req, res, next) {
    try {
      // id from parameter in URL "/:id"
      let hoadonID = req.params.id || {}
      console.log('- Delete Hoadon id: ' + hoadonID)
      // Send to HoadonDAO.deleteHoadon(...)
      const hoadonResponse = await HoadonDAO.deleteHoadon(
        hoadonID
      )
      res.json({ status: "success", response: hoadonResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}