import { MongoClient } from "mongodb"
import { ObjectId } from "mongodb"
import { MongoError } from "mongodb"
import dotenv from "dotenv"
dotenv.config({ path: "../.env" })

  // node backend\migrations\sanpham-phanloai-migration.js

  // This leading semicolon (;) is to signify to the parser that this is a new expression. This expression is an
  // Immediately Invoked Function Expression (IIFE). It's being used to wrap this logic in an asynchronous function
  // so we can use await within.
  // To read more about this type of expression, refer to https://developer.mozilla.org/en-US/docs/Glossary/IIFE
  ; (async () => {
    try {
      console.log("CITISHOP_DB_URI =", process.env.CITISHOP_DB_URI)
      console.log("CITISHOP_NS =", process.env.CITISHOP_NS)
      const host = process.env.CITISHOP_DB_URI
      const client = await MongoClient.connect(host, { useNewUrlParser: true })
      const citishop = client.db(process.env.CITISHOP_NS)
      
      const predicate = {
        phanloai: { $exists: true, $type: "array" },
        // loai: { $exists: false },
        // gia: { $exists: false },
        // hinhanh: { $exists: false },
      }
      const projection = { phanloai: 1 }
      const cursor = await citishop
        .collection("sanpham")
        .find(predicate, projection)
        .toArray()
      const sanphamsToMigrate = cursor.map(({ _id, phanloai }) => ({
        updateOne: {
          filter: { _id: ObjectId(_id) },
          update: {
            $set: {
              loai: phanloai[0].ten,
              gia: phanloai[0].gia,
              hinhanh: phanloai[0].hinhanh,
            },
          },
        },
      }))
      console.log(
        "\x1b[32m",
        `Found ${sanphamsToMigrate.length} documents to update`,
      )
      // TODO: Complete the BulkWrite statement below
      const { modifiedCount } = await citishop.collection("sanpham").bulkWrite(sanphamsToMigrate)

      console.log("\x1b[32m", `${modifiedCount} documents updated`)
      client.close()
      process.exit(0)
    } catch (e) {
      if (
        e instanceof MongoError &&
        e.message.slice(0, "Invalid Operation".length) === "Invalid Operation"
      ) {
        console.log("\x1b[32m", "No documents to update")
      } else {
        console.error("\x1b[31m", `Error during migration, ${e}`)
      }
      process.exit(1)
    }
  })()
