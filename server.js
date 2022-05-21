const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const got = require("got");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


const apiURL = "https://api.openai.com/v1/engines/davinci/completions";


app.post("/api",async (req,res) => {
  // console.log(req.body.userInput)
  const prompt = req.body.userInput
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
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
  };

  try {
    const response = await got
      .post(url, { json: params, headers: headers })
      .json();
    output = `${prompt}${response.choices[0].text}`;
    // console.log(output);
    res.send(output)
  } catch (err) {
    console.log("The error is"+err);
  }
});

// app.get("/api", async (req, res) => {
//   try
//    {
//     const response = await axios.get(apiURL, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
//       },
//       json: data
//     });
//     console.log(result);
//     res.send(result.data);
//   } catch (error) {
//     console.log("THIS ERROR IS" + error);
//   }
// });

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
