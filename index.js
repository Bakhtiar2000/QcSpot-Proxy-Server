require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend to access this proxy

app.get("/api/qc-photos/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic bWFzdGVyOnNlbzVAb0I0JGZUZjI4");
  myHeaders.append(
    "Cookie",
    "PHPSESSID=3oodd5j25p6tmcpjto6h19mb4p; wmc_current_currency=USD; wmc_current_currency_old=USD"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://cnfans.com/open-api/v1/get_qc_photos?skupid=${id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => res.send(result))
    .catch((error) => console.error(error));
});

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
