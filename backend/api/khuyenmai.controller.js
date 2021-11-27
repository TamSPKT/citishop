import KhuyenmaiDAO from "../dao/khuyenmaiDAO.js";

export default class KhuyenmaiController {
  static async apiGetKhuyenmaiList(req, res, next) {
    // Check if restaurantsPerPage exists in URL
    const khuyenmaiPerPage = req.query.khuyenmaiPerPage ? parseInt(req.query.khuyenmaiPerPage, 10) : 20
    // Check if page number exists in URL
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.tenKhuyenMai) { // If tenKhuyenMai in query
      filters.tenKhuyenMai = req.query.tenKhuyenMai
    } else if (req.query.hoaDonTriGiaTren && req.query.ngay) { // If hoaDonTriGiaTren in query AND ngay in query
      filters.hoaDonTriGiaTren = req.query.hoaDonTriGiaTren
      filters.ngay = req.query.ngay
    } else if (req.query.hoaDonTriGiaTren) { // If hoaDonTriGiaTren in query
      filters.hoaDonTriGiaTren = req.query.hoaDonTriGiaTren
    }

    const { khuyenmaiList, totalNumKM } = await KhuyenmaiDAO.getKhuyenmaiList({
      filters,
      page,
      khuyenmaiPerPage,
    })

    let response = {
      khuyenmaiList: khuyenmaiList,
      page: page,
      filters: filters,
      entries_per_page: khuyenmaiPerPage,
      total_results: totalNumKM,
    }
    res.json(response)
  }

  static async apiGetKhuyenmaiByID(req, res, next) {
    try {
      // id from parameter in URL "/:id"
      let id = req.params.id || {}

      const khuyenmai = await KhuyenmaiDAO.getKhuyenmaiByID(id)

      if (!khuyenmai) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(khuyenmai)
    } catch (e) {
      console.log(`- apiGetKhuyenmaiByID, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiPostKhuyenmai(req, res, next) {
    try {
      // Get info from the body of the request
      const tenKhuyenMai = req.body.tenKhuyenMai
      const giam = req.body.giam
      const hoaDonTriGia = req.body.hoaDonTriGia
      const ngayBatDau = req.body.ngayBatDau
      const ngayKetThuc = req.body.ngayKetThuc

      // Send to KhuyenmaiDAO.addKhuyenmai(...)
      const khuyenmaiResponse = await KhuyenmaiDAO.addKhuyenmai(
        tenKhuyenMai, giam, hoaDonTriGia, ngayBatDau, ngayKetThuc
      )
      // Return success if it's worked
      res.json({ status: "success", response: khuyenmaiResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateKhuyenmai(req, res, next) {
    try {
      // id from parameter in URL "/:id"
      let khuyenmaiID = req.params.id || {}
      // Get info from the body of the request
      const tenKhuyenMai = req.body.tenKhuyenMai
      const giam = req.body.giam
      const hoaDonTriGia = req.body.hoaDonTriGia
      const ngayBatDau = req.body.ngayBatDau
      const ngayKetThuc = req.body.ngayKetThuc

      // Send to KhuyenmaiDAO.updateKhuyenmai(...)
      const khuyenmaiResponse = await KhuyenmaiDAO.updateKhuyenmai(
        khuyenmaiID,
        tenKhuyenMai, giam, hoaDonTriGia, ngayBatDau, ngayKetThuc
      )

      var { error } = khuyenmaiResponse
      if (error) { // Check error
        res.status(400).json({ error })
        return
      }

      // Return success if it's worked
      res.json({ status: "success", response: khuyenmaiResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteKhuyenmai(req, res, next) {
    try {
      // id from parameter in URL "/:id"
      let khuyenmaiID = req.params.id || {}
      console.log('- Delete Khuyenmai id: ' + khuyenmaiID)
      // Send to KhuyenmaiDAO.deleteKhuyenmai(...)
      const khuyenmaiResponse = await KhuyenmaiDAO.deleteKhuyenmai(
        khuyenmaiID
      )
      res.json({ status: "success", response: khuyenmaiResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}