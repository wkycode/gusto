import express from "express";

const app = express();

// app.use('/', (async () => await import('./src/routes.js')))
app.use(express.urlencoded({ extended: true })); // parses url queries to req.query
app.use(express.json()); // parses json to req.body
// app.use('/', routes)

app.use("/", (await import("./src/routes.ts")).default);
const PORT = 8080;

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
