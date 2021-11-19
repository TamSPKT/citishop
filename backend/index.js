import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import LoaiSpDAO from "./dao/loaiSpDAO.js"
import UsersDAO from "./dao/usersDAO.js"
import SanphamDAO from "./dao/sanphamDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config() // Load enviroment variables
const MongoClient = mongodb.MongoClient

// Get port number from .env, if can not be accessed, default to 8000
const port = process.env.PORT || 8000

MongoClient.connect(
  process.env.CITISHOP_DB_URI, // Pass in database URI
  {
    maxPoolSize: 50, // Only 50 peoples can connect at a time
    wtimeoutMS: 2500, // Request will timeout after 2500ms
    useNewUrlParser: true // Set flag to use new connection string parser from MongoDB node.js driver
  }
)
  .catch(err => { // Catch errors
    console.error(err.stack)
    process.exit(1) // Exit the process
  })
  .then(async client => {
    await LoaiSpDAO.injectDB(client)
    await UsersDAO.injectDB(client)
    await SanphamDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`- listening on port ${port}`)
    })
  })