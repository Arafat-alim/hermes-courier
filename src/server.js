const app = require("./index");

const PORT = process.env.PORT || 8811;
const BASE_URL = process.env.BASE_URL || "http://localhost";

app.listen(PORT, () => {
  console.log(`Server running on ${BASE_URL}:${PORT}`);
});
