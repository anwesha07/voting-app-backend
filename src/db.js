const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL);

const database = mongoose.connection;
database.on("error", (error) => console.log(error));
database.once("connected", () => {
  console.log("Database Connected");
});
