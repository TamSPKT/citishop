import express from "express"
import KhuyenmaiController from "./khuyenmai.controller.js"

const route = express.Router()

route.route("/")
  .get(KhuyenmaiController.apiGetKhuyenmaiList) // GET Request
  .post(KhuyenmaiController.apiPostKhuyenmai) // POST Request

route.route("/id/:id")
  .get(KhuyenmaiController.apiGetKhuyenmaiByID) // GET Request
  .put(KhuyenmaiController.apiUpdateKhuyenmai) // PUT Request
  .delete(KhuyenmaiController.apiDeleteKhuyenmai) // DELETE Request

export default route