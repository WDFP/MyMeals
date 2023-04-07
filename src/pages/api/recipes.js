/* eslint-disable import/no-anonymous-default-export */
// displays all recipes in JSON format
import clientPromise from "../../lib/mongodb";

// Define default export function
export default async(req, res) => {
  try {
    // Connect to MongoDB client
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Fetch recipes from MongoDB collection
    const recipes = await db
      .collection("recipes")
      .find({})
      .limit(30)
      .toArray();

    // Send JSON response of fetched data
    res.json(recipes);
  } catch (error) {
    // Handle any error that occurs
    console.error(error);
  }
};