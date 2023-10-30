import { query } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const products = await query({
        query: "SELECT * FROM products",
      });

      res.status(200).json({ products: products });
    } catch (error) {
      console.error("Error querying the database", error);
      res.status(500).json({ message: "Error querying the database", error });
    }
  }

  if (req.method === "POST") {
    const { product_name, text_field, text_color, bg_color, date } = req.body;
    try {
      const docAdd = await query({
        query:
          "INSERT INTO products (product_name, text_field, text_color, bg_color, date) VALUES (?, ?, ?, ?, ?)",
        values: [product_name, text_field, text_color, bg_color, date || null],
      });
  
      
      res.status(200).json({ docAdd });
    } catch (error) {
      console.error("Error querying the database", error);
      res.status(500).json({ message: "Error querying the database", error });
    }
  }

  if (req.method === "PUT") {
    const { product_id, product_name, text_field, text_color, bg_color, backgroundColor, date } =
      req.body
    try {
      const editDoc = await query({
        query:
          "UPDATE products SET product_name = ?, text_field = ?, text_color = ?, bg_color = ?, date = ? WHERE product_id = ?",
        values: [
          product_name,
          text_field,
          text_color,
          bg_color,
          date || null,
          product_id,
        ],
      })

      res.status(200).json({ editDoc })
    } catch (error) {
      console.log("Error: ", error)
      res.status(500).json({ message: "Error querying from database ", error })
    }
  }

  if (req.method === "DELETE") {
    const { product_id } = req.body
    try {
      const DeleteProducts = await query({
        query: "DELETE FROM products WHERE product_id = ?",
        values: [
          product_id
        ]
      });

      res.status(200).json({ DeleteProducts });
    } catch (error) {
      console.error("Error querying the database", error);
      res.status(500).json({ message: "Error querying the database", error });
    }
  }

}
