import clientPromise from "@/lib/mongodb";
const { MONGODB_DB } = process.env;

export default async function handler(req, res) {
  const { ingredientName } = req.body;
  try {
    const client = await clientPromise;
    const db = client.db(MONGODB_DB);
    const result = await db
    .collection("groceries")
    .updateOne(
      {},
      { $pull: { grocery_list: ingredientName } },
      { multi: true }
    )
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to delete item" });
  }
}