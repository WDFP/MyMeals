/* eslint-disable import/no-anonymous-default-export */
// displays all favourites in JSON format
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    if (req.method === "POST") {
      // Extract the data from the POST request body
      const { user_id, recipe_id, active } = req.body;

      // Create a new document in the "favourites" collection
      const result = await db.collection("favourites").insertOne({
        user_id,
        recipe_id,
        active,
      });

      // Send a JSON response indicating success
      res.status(201).json({ message: "Favourite added successfully" });
    } else {
      // If not a POST request, fetch favourites from MongoDB collection
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
