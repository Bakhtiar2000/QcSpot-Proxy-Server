require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const puppeteer = require("puppeteer");
app.use(cors());

app.get("/api/qc-photos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set headers
    await page.setExtraHTTPHeaders({
      authorization: "Basic bWFzdGVyOnNlbzVAb0I0JGZUZjI4",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      Accept: "application/json",
      Referer: "https://cnfans.com/",
    });

    // Navigate to the URL
    await page.goto(
      `https://cnfans.com/open-api/v1/get_qc_photos?skupid=${id}`
    );

    // Extract the response
    const data = await page.evaluate(() => document.body.innerText);
    await browser.close();

    // Check if the response is valid JSON
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (jsonError) {
      console.error("Response is not valid JSON:", data);
      res
        .status(500)
        .json({ error: "Response is not valid JSON", details: data });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
