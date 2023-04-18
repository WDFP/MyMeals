/* eslint-disable import/no-anonymous-default-export */
// displays all favourites in JSON format
import clientPromise from "../../lib/mongodb";

// Define default export function
export default async(req, res) => {
  try {
    // Connect to MongoDB client
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Fetch favourites from MongoDB collection
    const favourites = await db
      .collection("favourites")
      .find({})
      // .limit(30)
      .toArray();

    // Send JSON response of fetched data
    res.json(favourites);
  } catch (error) {
    // Handle any error that occurs
    console.error(error);
  }
};