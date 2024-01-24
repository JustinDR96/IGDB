const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  let target = "https://api.igdb.com/v4";

  // Create a proxy middleware
  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader("Client-ID", process.env.VITE_CLIENT_ID);
      proxyReq.setHeader("Authorization", `Bearer ${process.env.ACCESS_TOKEN}`);
    },
  });

  // Use the proxy to forward the request
  proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
    throw new Error(`Request '${req.url}' is not proxied!`);
  });
};
