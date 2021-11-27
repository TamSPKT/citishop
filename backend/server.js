import express from "express"
import cors from "cors"
import loaiSp from "./api/loaiSp.route.js"
import users from "./api/users.route.js"
import sanphamAndReviews from "./api/sanphamAndReviews.route.js"
import khuyenmai from "./api/khuyenmai.route.js"

const app = express() // Use to make our server

// Middlewares
app.use(cors()) // Express will use CORS
app.use(express.json()) // Server can accept JSON in the body of a request

// Routes - URL
app.use("/api/v1/loaiSP", loaiSp)
app.use("/api/v1/users", users)
app.use("/api/v1/sanpham", sanphamAndReviews)
app.use("/api/v1/khuyenmai", khuyenmai)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app