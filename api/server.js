const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const quetions = require("./questions.json");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

const shuffleArray = (arr) => {
  let currentIndex = arr.length;

  // performance-wise the Fisher-Yates algorithm is much better
  while (currentIndex > 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
};

app.get("/getquestions", (req, res) => {
  try {
    const { count } = req.query;
    const slicedArrar = shuffleArray(quetions).slice(0, count);
    res.status(200).send({ data: slicedArrar, message: "Success" });
  } catch (err) {
    res.status(404).send({ data: [], message: "Items failed to load" });
  }
});

app.listen(port, () => {
  console.log("Server started", port);
});
