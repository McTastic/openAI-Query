const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const got = require("got");
const fs = require("fs");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const apiURL = "https://api.openai.com/v1/engines/davinci/completions";
const destination = "./db/query.json";

app.post("/api", async (req, res) => {
  // console.log(req.body.userInput)

  const prompt = req.body.prompt;
  const url = apiURL;
  const params = {
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
  };

  try {
    const response = await got
      .post(url, { json: params, headers: headers })
      .json();
    output = `${response.choices[0].text}`;
    // console.log(output);
    const messageObj = {
      output: output,
    };
    res.send(messageObj);
    fs.writeFile(destination, JSON.stringify(messageObj, null, 4), (err) =>
      err
        ? console.error(err)
        : console.info(`\nData written to ${destination}`)
    );
  } catch (err) {
    console.log("The error is " + err);
  }
});

app.get("/api", async (req, res) => {
  try {
    const data = await JSON.parse(fs.readFileSync("./db/query.json"));
    res.send(data);
  } catch (error) {
    console.log("THIS ERROR IS" + error);
  }
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
