import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let reviews // Reference to 'reviews' database

export default class ReviewsDAO {
  static async injectDB(conn) { // Initially connect to our database
    if (reviews) { // If already has reference
      return
    }
    try { // Try to connect to our database
      reviews = await conn.db(process.env.CITISHOP_NS).collection("reviews")
    } catch (e) {
      console.error(
        `- Unable to establish a collection handle in ReviewsDAO: ${e}`,
      )
    }
  }

  static async addReview(sanphamID, userID, ngayTao, noiDung) {
    try {
      const reviewDoc = {
        username_id: userID,
        ngayTao: ngayTao,
        noiDung: noiDung,
        sanpham_id: ObjectId(sanphamID)
      }
      return await reviews.insertOne(reviewDoc) // Insert to database
    } catch (e) {
      console.error(`- Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(reviewID, userID, ngayChinhSua, noiDung) {
    try {
      // Only update a review if it was created by the same user who's trying to update it
      const updateResponse = await reviews.updateOne(
        { username_id: userID, _id: ObjectId(reviewID) },
        { $set: { noiDung: noiDung, ngayChinhSua: ngayChinhSua } }, // Set new text and date
      )
      return updateResponse
    } catch (e) {
      console.error(`- Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(reviewID, userID) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewID), // ReviewId
        username_id: userID, // Same user who created the review
      }) // Filter
      return deleteResponse
    } catch (e) {
      console.error(`- Unable to delete review: ${e}`)
      return { error: e }
    }
  }
}