import express from "express"
import SanphamController from "./sanpham.controller.js"
import ReviewsController from "./reviews.controller.js"

const route = express.Router()

route.route("/")
  .get(SanphamController.apiGetSanphamList) // GET Request
  .post(SanphamController.apiPostSanpham) // POST Request

route.route("/id/:id")
  .get(SanphamController.apiGetSanphamByID) // GET Request
  .put(SanphamController.apiUpdateSanpham) // PUT Request
  .delete(SanphamController.apiDeleteSanpham) // DELETE Request

route.route("/hang")
  .get(SanphamController.apiGetSanphamHang) // GET Request

route.route("/review")
  .post(ReviewsController.apiPostReview) // POST Request
  .put(ReviewsController.apiUpdateReview) // PUT Request
  .delete(ReviewsController.apiDeleteReview) // DELETE Request

export default route