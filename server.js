const express = require("express");
const PaymentRoute = require("./route/Payment");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello Flutterwave!"));

app.use("/api", PaymentRoute);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
