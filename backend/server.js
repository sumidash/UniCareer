
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("UniCareer Backend Server is Running!");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`UniCareer Backend running on port ${PORT}`);
  });
};

startServer();
