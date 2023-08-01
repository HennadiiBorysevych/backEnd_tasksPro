const app = require("./app");
const mongoose = require("mongoose");
const { DB, PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful. Server port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
