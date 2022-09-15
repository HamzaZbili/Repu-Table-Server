// module.exports = app;
const express = require("express");
const app = express();

// env variables access
require("dotenv/config");
// connect to database
require("./db");

require("./config")(app);
// route handling here
const allRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");

const userAdmin = require("./routes/moderate.routes/moderate.users.routes");
const eateryAdmin = require("./routes/moderate.routes/moderate.eateries.routes");

const eateriesOwner = require("./routes/owner.routes/eateries.routes")


// 👇 Start handling routes here
app.use("/", allRoutes);
app.use("/auth", authRoutes);

app.use("/moderate-users", userAdmin);
app.use("/moderate-eateries", eateryAdmin);

app.use("/owner-eateries", eateriesOwner)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
