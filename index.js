if (process.NODE_ENV != 'production') { require('dotenv').config(); }
const express = require("express");
const app = express();
const cors = require('cors');
const user = require('./routes/user')
const store = require('./routes/store')
const countKeyPress = require('./routes/counts');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/user", user);
app.use("/store", store);
app.use("/metrics", countKeyPress)
const port = process.env.PORT || 8600
app.listen(port, () => {
});