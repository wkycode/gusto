import express from "express";
const PORT = 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", (await import("./src/routes.ts")).default);
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
