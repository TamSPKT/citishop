import express from "express"
import HoadonController from "./hoadon.controller.js"

const route = express.Router()

route.route("/")
  .get(HoadonController.apiGetHoadonList) // GET Request
  .post(HoadonController.apiPostHoadon) // POST Request

route.route("/id/:id")
  .get(HoadonController.apiGetHoadonByID) // GET Request
  .put(HoadonController.apiUpdateHoadon) // PUT Request
  .delete(HoadonController.apiDeleteHoadon) // DELETE Request

export default route