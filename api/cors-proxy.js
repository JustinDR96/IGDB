import cors_proxy from "cors-anywhere";

export default (req, res) => {
  req.query.url = `https://api.igdb.com/v4${req.url.replace(
    /^\/api\/cors-proxy/,
    ""
  )}`;
  cors_proxy
    .createServer({
      originWhitelist: [], // Allow all origins
      requireHeader: ["origin", "x-requested-with"],
      removeHeaders: ["cookie", "cookie2"],
    })
    .handleRequest(req, res);
};
