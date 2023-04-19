/* eslint-disable import/no-anonymous-default-export */
// displays all ingredientsAndInstructions in JSON format
import clientPromise from "../../lib/mongodb";

// Define default export function
export default async (req, res) => {
  try {
    // Connect to MongoDB client
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    if (req.method === "POST") {
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
    } else if (req.method === "DELETE") {
      const { dayToUpdate, mealToDelete } = req.body;

      const result = await db
        .collection("meal_plans")
        .updateOne({}, { $pull: { [dayToUpdate]: mealToDelete } });

      if (result.modifiedCount === 1) {
        console.log(`Meal successfully deleted from ${dayToUpdate}`);
        res.status(200).json({ message: `Meal deleted from ${dayToUpdate} successfully` });
      } else {
        console.error(`Failed to delete meal from ${dayToUpdate}`);
        res.status(500).json({ error: `Failed to delete meal from ${dayToUpdate}` });
      }
    } else {
      const mealPlans = await db.collection("meal_plans").findOne({});

      res.status(200).json(mealPlans);
    }
  } catch (error) {
    // Handle any error that occurs
    console.error(error);
  }
};
