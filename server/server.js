const app = require("./app");
const dbConnection = require("./config/mongodb");
require("dotenv").config();
dbConnection();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
