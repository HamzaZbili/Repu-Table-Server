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
const authRoutes = require("./routes/auth.routes")
const userAdmin = require("./routes/admin.routes/user.admin.routes");
const eateryAdmin = require("./routes/admin.routes/eatery.admin.routes");
// 👇 Start handling routes here
app.use("/", allRoutes);
app.use("/auth", authRoutes);
app.use("/admin-users", userAdmin);
app.use("/admin-eateries", eateryAdmin);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
