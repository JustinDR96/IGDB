// import express, { json, urlencoded } from "express";
// import cors from "cors";
// import authMiddleware from "./middleware/auth.cjs";
// import httpProxy from "http-proxy";

// // import route
// import gamesRouter from "./routes/fetchGames.cjs";
// import popularGamesRouter from "./routes/popularGames.cjs";
// import preorderGamesRouter from "./routes/preorderGames.cjs";
// import trendingGamesRouter from "./routes/trendingGames.cjs";
// import detailsGamesRouter from "./routes/detailsGames.cjs";
// import searchGamesRouter from "./routes/searchGames.cjs";

// const app = express();
// const proxy = httpProxy.createProxyServer();
// const port = process.env.PORT || 3000;

// app.use(authMiddleware);
// app.options("*", cors());
// app.use(cors());
// app.use(json()); // Utilisez express.json() comme middleware directement
// app.use(urlencoded({ extended: true }));

// // Proxy route
// app.use("/proxy", (req, res) => {
//   req.url = req.url.replace("/proxy", "");
//   proxy.web(req, res, { target: "https://api.igdb.com/v4/games" });
// });

// // routes
// app.use("/", gamesRouter);
// app.use(popularGamesRouter);
// app.use(preorderGamesRouter);
// app.use(trendingGamesRouter);
// app.use("/games", detailsGamesRouter);
// app.use("/search", searchGamesRouter);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
