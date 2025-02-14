const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db");
const routes = require("./src/routes/authRoute");
const swaggerSetup = require("./src/config/swagger");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", routes);

// Setup Swagger
swaggerSetup(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
