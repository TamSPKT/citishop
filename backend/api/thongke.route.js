import express from "express"
import ThongkeController from "./thongke.controller.js"

const route = express.Router()

route.route("/hoadon")
  .get(ThongkeController.apiGetThongkeHoadons) // GET Request

route.route("/sanpham/gia")
  .get(ThongkeController.apiGetThongkeSanphamsByGia) // GET Request

route.route("/sanpham/hang")
  .get(ThongkeController.apiGetThongkeSanphamsByHang) // GET Request

route.route("/khuyenmai")
  .get(ThongkeController.apiGetThongkeKhuyenmais) // GET Request

route.route("/review")
  .get(ThongkeController.apiGetThongkeReviews) // GET Request

route.route("/user")
  .get(ThongkeController.apiGetThongkeUsers) // GET Request

export default route