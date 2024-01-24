// api/proxy.js
import axios from "axios";

export default async (req, res) => {
  const url = `https://api.igdb.com${req.url.replace(/^\/api/, "/v4")}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};
