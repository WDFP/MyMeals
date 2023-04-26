/* eslint-disable import/no-anonymous-default-export */
// displays all favourites in JSON format
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    if (req.method === "POST") {
      // Extract the data from the POST request body
      const { user_id, recipe_id } = req.body;

      // Create a new document in the "favourites" collection
      const result = await db.collection("favourites").insertOne({
        user_id,
        recipe_id,
      });

      // Send a JSON response indicating success
      res.status(201).json({ message: "Favourite added successfully" });
    } else if (req.method === "DELETE") {
      // Extract the recipe id from the DELETE request body
      const { _id } = req.body;
      console.log("sample", _id);

      // Update the document in the "favourites" collection
      const result = await db.collection("favourites").deleteOne(
        { _id: ObjectId(_id) } ,
      );

      // Send a JSON response indicating success
      res.status(200).json({ message: "Favourite deleted successfully" });
    } else {
      // If not a POST or DELETE request, fetch favourites from MongoDB collection
      const favourites = await db
        .collection("favourites")
        .find({})
        .toArray();

      // Send JSON response of fetched data
      res.json(favourites);
    }
  } catch (error) {
    // Handle any error that occurs
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
