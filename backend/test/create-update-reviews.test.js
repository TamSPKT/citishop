const { MongoClient, ObjectId } = require('mongodb');
const { default: ReviewsDAO } = require('./mockDAO/reviewsDAO');
const { default: UsersDAO } = require('./mockDAO/usersDAO');
require('dotenv').config();

const testData = {
  username_id: "test",
  ngayTao: new Date(),
  noiDung: "Temp",
  sanpham_id: "00000000000000000000000e",
  noiDungNew: "TempPUT",
}

describe("Create/Update Review", () => {
  let connection;
  let reviewsDB;

  beforeAll(async () => {
    // console.log(process.env);
    connection = await MongoClient.connect(
      process.env.CITISHOP_DB_URI,
      {
        maxPoolSize: 50, // Only 50 peoples can connect at a time
        wtimeoutMS: 2500, // Request will timeout after 2500ms
        useNewUrlParser: true // Set flag to use new connection string parser from MongoDB node.js driver
      })
    // console.log(connection.s.options.maxPoolSize)
    reviewsDB = await connection.db(process.env.CITISHOP_NS).collection("reviews")

    await ReviewsDAO.injectDB(connection)
  });

  afterAll(async () => {
    await reviewsDB.deleteMany({
      username_id: "test", sanpham_id: ObjectId("00000000000000000000000e")
    })

    await connection.close();
    // await loaiSpDB.close();
  });

  test("Can create Review", async () => {
    const postResponse = await ReviewsDAO.addReview(
      testData.sanpham_id, testData.username_id, testData.ngayTao, testData.noiDung
    )

    expect(postResponse.acknowledged).toBe(true)
    expect(postResponse.insertedId).not.toBe(null)

    const pipeline = [
      { '$match': { '_id': new ObjectId(postResponse.insertedId) } }
    ]
    // Return 'user' with matching '_id'
    const user = await reviewsDB.aggregate(pipeline).next()
    expect(user._id).toEqual(postResponse.insertedId)
    expect(user.noiDung).toEqual(testData.noiDung)

    testData.id = postResponse.insertedId
    // console.log(testData.id)
  });

  test("Can update Review", async () => {
    const putResponse = await ReviewsDAO.updateReview(
      testData.id,
      testData.username_id, new Date(), testData.noiDungNew
    )

    expect(putResponse.modifiedCount).toBe(1)

    const pipeline = [
      { '$match': { '_id': new ObjectId(testData.id) } }
    ]
    // Return 'user' with matching '_id'
    const user = await reviewsDB.aggregate(pipeline).next()

    expect(user.noiDung).toEqual(testData.noiDungNew)
  });

});