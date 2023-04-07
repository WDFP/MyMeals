/* eslint-disable import/no-anonymous-default-export */
// displays all recipes in JSON format
import clientPromise from "../../lib/mongodb";

export default async(req, res) => {
  try {

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const recipes = await db
      .collection("recipes")
      .find({})
      .limit(30)
      .toArray();

    res.json(recipes);
  } catch (e) {
    console.error(e);
  }
};