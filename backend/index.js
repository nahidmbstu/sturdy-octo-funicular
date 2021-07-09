// import main packages

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

// create the express app

const app = express();

app.use(cors());

// built in middlewares

app.use(bodyParser.json());
// to support JSON-encoded bodies  api / postman
// can also use express.json()

// to support URL-encoded bodies / from websites
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for serving static files

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // serving the static html,Img files here in public folder

  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/test", (req, res) => {
  // serving the static html,Img files here in public folder

  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.post("/storefile", (req, res) => {
  let { values } = req.body;
  console.log(values);

  let num = values.numbers.join(",");
  let ft = values.floats.join(",");
  let alphas = values.alphas.join(",");

  fs.writeFile("numbers.txt", num, function (err) {
    if (err) return console.log(err);
    console.log("file OK");

    // let stats = fs.statSync("myfile.txt");
    // let fileSizeInBytes = stats.size;
    // let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
  });

  fs.writeFile("floats.txt", ft, function (err) {
    if (err) return console.log(err);
    console.log("file OK");
  });

  fs.writeFile("alpha.txt", alphas, function (err) {
    if (err) return console.log(err);
    console.log("file OK");
  });

  res.send({ message: "ok" });
});
app.get("/readfile", (req, res) => {
  let numPath = path.join(__dirname, "numbers.txt");
  let fPath = path.join(__dirname, "floats.txt");
  let APath = path.join(__dirname, "alpha.txt");

  let promises = [numPath, fPath, APath].map(function (_path) {
    return new Promise(
      function (_path, resolve, reject) {
        fs.readFile(_path, "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            resolve(data);
          }
        });
      }.bind(this, _path)
    );
  });

  Promise.all(promises).then(function (results) {
    console.log(results);
    res.send({ data: results });
  });
});

// send 404 if not found

app.get("*", function (req, res) {
  res.send("Page / route not Found").status(404);
});

// PORT
const port = process.env.PORT || 5000;

// start the server
app.listen(port, () => console.log(`listeing on  ... ${port}`));
