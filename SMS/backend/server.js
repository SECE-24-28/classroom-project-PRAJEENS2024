const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth');
const subRoute = require('./routes/subscriptions');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/subscriptions", subRoute);

app.listen(process.env.PORT, () => {
  console.log(`Backend server running on port ${process.env.PORT}`);
});