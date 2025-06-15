import express from "express";
const app = express();
const port = process.env.port || 3000;
app.get("/", (req, res) => {
  res.send("<h1>hello you sucker</h1>");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
