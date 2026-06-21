const mongoose = require("mongoose");

const uri =
  "mongodb+srv://muthamizhmandram2025_db_user:ypSHXkTY3jBSxvdf@cluster0.74ezr0j.mongodb.net/medqube?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });