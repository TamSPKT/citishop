import SanphamDAO from "../dao/sanphamDAO.js";

export default class SanphamController {
  static async apiGetSanphamList(req, res, next) {
    // Check if restaurantsPerPage exists in URL
    const sanphamPerPage = req.query.sanphamPerPage ? parseInt(req.query.sanphamPerPage, 10) : 20
    // Check if page number exists in URL
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.tenSP) { // If 'tenSP' in query
      filters.tenSP = req.query.tenSP
    } else if (req.query.hang) { // If 'hang' in query
      filters.hang = req.query.hang
    }

    const { sanphamList, totalNumSP } = await SanphamDAO.getSanphamList({
      filters,
      page,
      sanphamPerPage
    })

    let response = {
      sanpham: sanphamList,
      page: page,
      filters: filters,
      entries_per_page: sanphamPerPage,
      total_results: totalNumSP,
    }
    res.json(response)
  }

  static async apiGetSanphamByID(req, res, next) {
    try {
      // id from parameter in URL "/:id"
      let id = req.params.id || {}
      // Check if restaurantsPerPage exists in URL
      const reviewsPerPage = req.query.reviewsPerPage ? parseInt(req.query.reviewsPerPage, 10) : 20
      // Check if page number exists in URL
      const page = req.query.page ? parseInt(req.query.page, 10) : 0

      const sanpham = await SanphamDAO.getSanphamByID({
        id,
        page,
        reviewsPerPage,
      })

      if (!sanpham) {
        res.status(404).json({ error: "Not found" })
        return
      }

      res.json(sanpham)
    } catch (e) {
      console.log(`- apiGetSanphamByID, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiPostSanpham(req, res, next) {
    try {
      // Get info from the body of the request
      const tenSP = req.body.tenSP
      const phanloai = req.body.phanloai
      const giam = req.body.giam
      const mota = req.body.mota
      const soluong = req.body.soluong
      const hang = req.body.hang
      const loaiSP_id = req.body.loaiSP_id

      // Send to LoaiSpDAO.addLoaiSp(...)
      const sanphamResponse = await SanphamDAO.addSanpham(
        tenSP, phanloai, giam, mota, soluong, hang, loaiSP_id
      )
      // Return success if it's worked
      res.json({ status: "success", response: sanphamResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateSanpham(req, res, next) {
    try {
      // id from parameter in URL "/:id"
      let sanphamID = req.params.id || {}
      // Get info from the body of the request
      const tenSP = req.body.tenSP
      const phanloai = req.body.phanloai
      const giam = req.body.giam
      const mota = req.body.mota
      const soluong = req.body.soluong
      const hang = req.body.hang
      const loaiSP_id = req.body.loaiSP_id

      // Send to LoaiSpDAO.updateLoaiSp(...)
      const sanphamResponse = await SanphamDAO.updateSanpham(
        sanphamID,
        tenSP, phanloai, giam, mota, soluong, hang, loaiSP_id
      )

      var { error } = sanphamResponse
      if (error) { // Check error
        res.status(400).json({ error })
        return
      }

      res.json({ status: "success", response: sanphamResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteSanpham(req, res, next) {
    try {
      // id from parameter in URL "/:id"
      let sanphamID = req.params.id || {}
      console.log('- Delete Sanpham id: ' + sanphamID)
      // Send to SanphamDAO.deleteSanpham(...)
      const loaiSpResponse = await SanphamDAO.deleteSanpham(
        sanphamID
      )
      res.json({ status: "success", response: loaiSpResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetSanphamHang(req, res, next) {
    try {
      let hangList = await SanphamDAO.getHangList()
      res.json(hangList)
    } catch (e) {
      console.log(`- apiGetSanphamHang, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}