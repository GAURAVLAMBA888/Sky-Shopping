const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT || 8800;
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
    })
    .then(console.log(`Connected to MONGO_DB`))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else
        console.log(`Server is running at PORT ${PORT}`);
})