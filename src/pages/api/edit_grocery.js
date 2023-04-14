import clientPromise from "@/lib/mongodb";
const { MONGODB_DB } = process.env;


export default async function handler(req, res) {
  const { ingredientName, updatedItem } = req.body;
  try {
    const client = await clientPromise;
    const db = client.db(MONGODB_DB);
    const result = await db
      .collection("groceries")
      .updateOne(
        { grocery_list: ingredientName },
        { $set: { "grocery_list.$": updatedItem } }
      );
    res.status(200).json({ message: "Item updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to update item" });
  }
}