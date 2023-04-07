/* eslint-disable import/no-anonymous-default-export */
// displays all ingredientsAndInstructions in JSON format
import clientPromise from "../../lib/mongodb";

export default async(req, res) => {
  try {

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const ingredientsAndInstructions = await db
      .collection("ingredients_instructions")
      .find({})
      .limit(30)
      .toArray();

    res.json(ingredientsAndInstructions);
  } catch (e) {
    console.error(e);
  }
};