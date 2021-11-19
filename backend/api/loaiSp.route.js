import express from "express"
import LoaiSpController from "./loaiSp.controller.js"

const route = express.Router()

route.route("/")
  .get(LoaiSpController.apiGetLoaiSpList) // GET Request
  .post(LoaiSpController.apiPostLoaiSp) // POST Request

route.route("/id/:id")
  .get(LoaiSpController.apiGetLoaiSpByID) // GET Request
  .put(LoaiSpController.apiUpdateLoaiSp) // PUT Request
  .delete(LoaiSpController.apiDeleteLoaiSp) // DELETE Request

export default route