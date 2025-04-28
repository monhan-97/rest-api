import express, { Express } from "express";

const app: Express = express();

app.get("/user", (req, res) => {
  res.send("hello user hmh");
});

app.get("/", (req, res) => {
  res.send("hello on Vercel");
});

app.listen(3000, () => console.log("Server ready on port 3000."));

export default app;
