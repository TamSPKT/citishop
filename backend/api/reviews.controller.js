import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      // Get info from the body of the request
      const sanphamID = req.body.sanpham_id
      const userID = req.body.username_id
      const ngayTao = new Date() // Get a new date
      const noiDung = req.body.noiDung

      // Send to ReviewsDAO.addReview(..)
      const reviewResponse = await ReviewsDAO.addReview(
        sanphamID,
        userID,
        ngayTao,
        noiDung,
      )
      // Return success if it's worked
      res.json({ status: "success", response: reviewResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      // Get info from the body of the request
      const reviewID = req.body.review_id
      const userID = req.body.username_id
      const ngayChinhSua = new Date() // Get a new date
      const noiDung = req.body.noiDung

      // Send to ReviewsDAO.updateReview(..)
      const reviewResponse = await ReviewsDAO.updateReview(
        reviewID,
        userID, // User who created the review is the same one who updates the review
        ngayChinhSua,
        noiDung,
      )

      var { error } = reviewResponse
      if (error) { // Check error
        res.status(400).json({ error })
      }

      if (reviewResponse.modifiedCount === 0) { // Review was not updated
        throw new Error(
          "unable to update review - user may not be original poster",
        )
      }

      res.json({ status: "success", response: reviewResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewID = req.query.id // reviewID is a query paarameter in URL
      const userID = req.body.username_id // Get userId (Same user) in the body of the request (Non-standard to have anything in the body of HTTP DELETE Request)
      console.log('- Delete Review id: ' + reviewID)
      // Send to ReviewsDAO.deleteReview(..)
      const reviewResponse = await ReviewsDAO.deleteReview(
        reviewID,
        userID,
      )
      res.json({ status: "success", response: reviewResponse })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}