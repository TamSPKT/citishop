import express from "express"
import UsersController from "./users.controller.js"

const route = express.Router()

route.route("/")
  .get(UsersController.apiGetUsersList) // GET Request
  .post(UsersController.apiPostUser) // POST Request

route.route("/id/:id")
  .get(UsersController.apiGetUserByID) // GET Request

route.route("/name/:username")
  .get(UsersController.apiGetUserByUsername) // GET Request
  .put(UsersController.apiUpdateUser) // PUT Request
  .delete(UsersController.apiDeleteUser) // DELETE Request

export default route