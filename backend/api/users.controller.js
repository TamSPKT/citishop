import UsersDAO from "../dao/usersDAO.js";

export default class UsersController {
  static async apiGetUsersList(req, res, next) {
    // Check if restaurantsPerPage exists in URL
    const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
    // Check if page number exists in URL
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.username) { // If 'username' in query
      filters.username = req.query.username
    } else if (req.query.email) { // If 'email' in query
      filters.email = req.query.email
    }

    const { usersList, totalNumUsers } = await UsersDAO.getUsersList({
      filters,
      page,
      usersPerPage,
    })

    let response = {
      loaiSp: usersList,
      page: page,
      filters: filters,
      entries_per_page: usersPerPage,
      total_results: totalNumUsers,
    }
    res.json(response)
  }

  static async apiGetUserByID(req, res, next) {
    try {
      // id from parameter in URL "/:id"
      let id = req.params.id || {}

      const user = await UsersDAO.getUserByID(id)

      if (!user) {
        res.status(404).json({ error: "Not found" })
        return
      }

      res.json(user)
    } catch (e) {
      console.log(`- apiGetUserByID, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetUserByUsername(req, res, next) {
    try {
      // 'username' from parameter in URL "/:username"
      let username = req.params.username || {}

      const user = await UsersDAO.getUserByUsername(username)

      if (!user) {
        res.status(404).json({ error: "Not found" })
        return
      }

      res.json(user)
    } catch (e) {
      console.log(`- apiGetUserByID, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiPostUser(req, res, next) {
    try {
      // Get info from the body of the request
      const username = req.body.username
      const password = req.body.password
      const email = req.body.email
      const sdt = req.body.sdt
      const gioitinh = req.body.gioitinh
      const ngaysinh = req.body.ngaysinh
      const diachi = req.body.diachi
      const phanquyen = req.body.phanquyen

      // Send to LoaiSpDAO.addLoaiSp(...)
      const userResponse = await UsersDAO.addUser(
        username, password, email, sdt, gioitinh, ngaysinh, diachi, phanquyen
      )
      // Return success if it's worked
      res.json({ status: "success", response: userResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateUser(req, res, next) {
    try {
      // 'username' from parameter in URL "/:username"
      let username = req.params.username || {}
      // Get info from the body of the request
      const password = req.body.password
      const email = req.body.email
      const sdt = req.body.sdt
      const gioitinh = req.body.gioitinh
      const ngaysinh = req.body.ngaysinh
      const diachi = req.body.diachi
      const phanquyen = req.body.phanquyen

      // Send to LoaiSpDAO.updateLoaiSp(...)
      const userResponse = await UsersDAO.updateUser(
        username,
        password, email, sdt, gioitinh, ngaysinh, diachi, phanquyen
      )

      var { error } = userResponse
      if (error) { // Check error
        res.status(400).json({ error })
        return
      }

      res.json({ status: "success", response: userResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteUser(req, res, next) {
    try {
      // 'username' from parameter in URL "/:username"
      let username = req.params.username || {}
      console.log('- Delete user username: ' + username)
      // Send to LoaiSpDAO.deleteLoaiSp(...)
      const userResponse = await UsersDAO.deleteUser(
        username
      )
      res.json({ status: "success", response: userResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}