import LoaiSpDAO from "../dao/loaiSpDAO.js";

export default class LoaiSpController {
  static async apiGetLoaiSpList(req, res, next) {
    // Check if restaurantsPerPage exists in URL
    const loaiSpPerPage = req.query.loaiSpPerPage ? parseInt(req.query.loaiSpPerPage, 10) : 20
    // Check if page number exists in URL
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.tenloaiSP) { // If tenloaiSP in query
      filters.tenloaiSP = req.query.tenloaiSP
    } else if (req.query.mota) { // If mota in query
      filters.mota = req.query.mota
    }

    const { LoaiSpList, totalNumLoaiSp } = await LoaiSpDAO.getLoaiSpList({
      filters,
      page,
      loaiSpPerPage,
    })

    let response = {
      loaiSp: LoaiSpList,
      page: page,
      filters: filters,
      entries_per_page: loaiSpPerPage,
      total_results: totalNumLoaiSp,
    }
    res.json(response)
  }

  static async apiGetLoaiSpByID(req, res, next) {
    try {
      // id from parameter in URL "/:id"
      let id = req.params.id || {}
      // Check if restaurantsPerPage exists in URL
      const sanphamPerPage = req.query.sanphamPerPage ? parseInt(req.query.sanphamPerPage, 10) : 20
      // Check if page number exists in URL
      const page = req.query.page ? parseInt(req.query.page, 10) : 0

      const loaiSp = await LoaiSpDAO.getLoaiSpByID({
        id,
        page,
        sanphamPerPage,
      })

      if (!loaiSp) {
        res.status(404).json({ error: "Not found" })
        return
      }

      res.json(loaiSp)
    } catch (e) {
      console.log(`- apiGetLoaiSpByID, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiPostLoaiSp(req, res, next) {
    try {
      // Get info from the body of the request
      const tenloaiSP = req.body.tenloaiSP
      const mota = req.body.mota

      // Send to LoaiSpDAO.addLoaiSp(...)
      const loaiSpResponse = await LoaiSpDAO.addLoaiSp(
        tenloaiSP,
        mota
      )
      // Return success if it's worked
      res.json({ status: "success", response: loaiSpResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateLoaiSp(req, res, next) {
    try {
      // id from parameter in URL "/:id"
      let loaiSpID = req.params.id || {}
      // Get info from the body of the request
      const tenloaiSP = req.body.tenloaiSP
      const mota = req.body.mota

      // Send to LoaiSpDAO.updateLoaiSp(...)
      const loaiSpResponse = await LoaiSpDAO.updateLoaiSp(
        loaiSpID,
        tenloaiSP,
        mota
      )

      var { error } = loaiSpResponse
      if (error) { // Check error
        res.status(400).json({ error })
        return
      }

      res.json({ status: "success", response: loaiSpResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteLoaiSp(req, res, next) {
    try {
      // id from parameter in URL "/:id"
      let loaiSpID = req.params.id || {}
      console.log('- Delete loaiSP id: ' + loaiSpID)
      // Send to LoaiSpDAO.deleteLoaiSp(...)
      const loaiSpResponse = await LoaiSpDAO.deleteLoaiSp(
        loaiSpID
      )
      res.json({ status: "success", response: loaiSpResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}