/* eslint-disable import/no-anonymous-default-export */
// displays all ingredientsAndInstructions in JSON format
import clientPromise from "../../lib/mongodb";

// Define default export function
export default async (req, res) => {
  try {
    // Connect to MongoDB client
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const { ingredientName } = req.body;

    const result = await db
      .collection("groceries")
      .updateOne({}, { $push: { grocery_list: ingredientName } });

    if (result.modifiedCount === 1) {
      console.log(`${ingredientName} successfully added to groceries`);
      res
        .status(200)
        .json({ message: `Grocery added to groceries successfully` });
    } else {
      // Failed to update
      console.error(`Failed to add grocery to groceries`);
      console.log(ingredientName);
      res.status(500).json({ error: `Failed to add grocery to groceries` });
    }
  } catch (error) {
    // Handle any error that occurs
    console.error(error);
  }
};
