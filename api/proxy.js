// api/proxy.js
import axios from "axios";

export default async (req, res) => {
  const url = `https://api.igdb.com/v4${req.url.replace(/^\/api\/proxy/, "")}`;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const accessToken = import.meta.env.ACCESS_TOKEN;

  try {
    const response = await axios.post(url, req.body, {
      headers: {
        Accept: "application/json",
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};
