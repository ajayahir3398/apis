const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db");
const swaggerSetup = require("./src/config/swagger");
const getTokenRoute = require("./src/routes/getTokenRoute");
const authRoute = require("./src/routes/authRoute");
const customerRoutes = require("./src/routes/customerRoute");
const productRoute = require("./src/routes/productRoute");
const challanRoute = require("./src/routes/challanRoute");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.json());

app.use("/", getTokenRoute);
app.use("/api/auth", authRoute);
app.use("/api/customer", customerRoutes);
app.use("/api/product", productRoute);
app.use("/api/challan", challanRoute);

// Setup Swagger
swaggerSetup(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
