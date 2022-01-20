// import mongodb from "mongodb"
const ObjectId = require("mongodb").ObjectId
let users // Reference to 'users' database

export default class UsersDAO {
  static async injectDB(conn) { // Initially connect to our database
    if (users) { // If already has reference
      return
    }
    try { // Try to connect to our database
      users = await conn.db(process.env.CITISHOP_NS).collection("users")
    } catch (e) {
      console.error(
        `- Unable to establish a collection handle in UsersDAO: ${e}`,
      )
    }
  }

  static async getUsersList({ // Get a list of all users in database
    filters = null, // Filter to sort by, default to none
    page = 0, // Page number, default to 0
    usersPerPage = 20, // Default to 20
  } = {}) {
    let query
    if (filters) {
      if ("username" in filters) { // Search by username
        query = { "username": { $regex: filters["username"], $options: "i" } } // Case insensitive
      } else if ("email" in filters) { // Search by email
        query = { "email": { $regex: filters["email"], $options: "i" } } // Case insensitive
      }
    }

    let cursor

    try {
      // Find all documents from the database that go along with the query that we passed in
      cursor = await users.find(query)
    } catch (e) {
      console.error(`- Unable to issue find command, ${e}`)
      return { usersList: [], totalNumUsers: 0 }
    }

    const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page)

    try {
      const usersList = await displayCursor.toArray()
      const totalNumUsers = await users.countDocuments(query)

      return { usersList, totalNumUsers }
    } catch (e) {
      console.error(
        `- Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { usersList: [], totalNumUsers: 0 }
    }
  }

  static async getUserByID(id) {
    try {
      const pipeline = [
        {
          '$match': {
            '_id': new ObjectId(id)
          }
        }
      ]
      // Return 'user' with matching '_id'
      return await users.aggregate(pipeline).next()
    } catch (e) {
      console.error(`- Something went wrong in getUserByID: ${e}`)
      throw e
    }
  }

  static async getUserByUsername(username) {
    try {
      const pipeline = [
        {
          '$match': {
            'username': username
          }
        }
      ]
      // Return 'user' with matching 'username'
      return await users.aggregate(pipeline).next()
    } catch (e) {
      console.error(`- Something went wrong in getUserByUsername: ${e}`)
      throw e
    }
  }

  static async addUser(
    username, password, email, sdt, gioitinh, ngaysinh, diachi, phanquyen
  ) {
    try {
      const userDoc = {
        username: username,
        password: password,
        email: email,
        sdt: sdt,
        gioitinh: gioitinh,
        ngaysinh: new Date(ngaysinh), // YYYY-MM-DD
        diachi: diachi,
        phanquyen: phanquyen
      }
      return await users.insertOne(userDoc) // Insert to database
    } catch (e) {
      console.error(`- Unable to post User: ${e}`)
      return { error: e }
    }
  }

  static async updateUser(
    username, password, email, sdt, gioitinh, ngaysinh, diachi, phanquyen
  ) {
    try {
      const updateResponse = await users.updateOne(
        { username: username }, // Filter
        {
          $set: {
            password: password,
            email: email,
            sdt: sdt,
            gioitinh: gioitinh,
            ngaysinh: new Date(ngaysinh), // YYYY-MM-DD
            diachi: diachi,
            phanquyen: phanquyen,
          }
        }
      )
      return updateResponse
    } catch (e) {
      console.error(`- Unable to update User: ${e}`)
      return { error: e }
    }
  }

  static async deleteUser(username) {
    try {
      const deleteResponse = await users.deleteOne(
        { username: username } // Filter
      )
      return deleteResponse
    } catch (e) {
      console.error(`- Unable to delete User: ${e}`)
      return { error: e }
    }
  }
}