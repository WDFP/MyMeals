/* eslint-disable import/no-anonymous-default-export */
// displays all ingredientsAndInstructions in JSON format
import clientPromise from "../../lib/mongodb";

// Define default export function
export default async (req, res) => {
  try {
    // Connect to MongoDB client
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const { dayToUpdate, mealToAdd } = req.body;

    const result = await db
      .collection("meal_plans")
      .updateOne({}, { $push: { [dayToUpdate]: mealToAdd } });

    if (result.modifiedCount === 1) {
      console.log(`Meal successfully added to ${dayToUpdate}`);
      res
        .status(200)
        .json({ message: `Meal added to ${dayToUpdate} successfully` });
    } else {
      // Failed to update
      console.error(`Failed to add meal to ${dayToUpdate}`);
      res.status(500).json({ error: `Failed to add meal to ${dayToUpdate}` });
    }
  } catch (error) {
    // Handle any error that occurs
    console.error(error);
  }
};
