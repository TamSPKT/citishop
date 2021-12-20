import ThongkeDAO from "../dao/thongkeDAO.js";

export default class ThongkeController {
  static async apiGetThongkeHoadons(req, res, next) {
    try {
      // Check if numMonths exists in URL
      const numMonths = req.query.numMonths ? parseInt(req.query.numMonths, 10) : 1

      const hoadons = await ThongkeDAO.thongkeHoadonsByMonths(numMonths)

      res.json(hoadons)
    } catch (e) {
      console.log(`- apiGetThongkeHoadons, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetThongkeSanphamsByGia(req, res, next) {
    try {
      const sanphams = await ThongkeDAO.thongkeSanphamsByGia()

      res.json(sanphams)
    } catch (e) {
      console.log(`- apiGetThongkeSanphamsByGia, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetThongkeSanphamsByHang(req, res, next) {
    try {
      const sanphams = await ThongkeDAO.thongkeSanphamsByHang()

      res.json(sanphams)
    } catch (e) {
      console.log(`- apiGetThongkeSanphamsByHang, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetThongkeKhuyenmais(req, res, next) {
    const { numPastKM, numCurrentKM, numFutureKM } = await ThongkeDAO.thongkeKhuyenmais()

    let response = { numPastKM, numCurrentKM, numFutureKM }
    res.json(response)
  }

  static async apiGetThongkeReviews(req, res, next) {
    const { totalReviews } = await ThongkeDAO.thongkeReviews()

    let response = { totalReviews }
    res.json(response)
  }

  static async apiGetThongkeUsers(req, res, next) {
    const { totalUsers } = await ThongkeDAO.thongkeUsers()

    let response = { totalUsers }
    res.json(response)
  }
}