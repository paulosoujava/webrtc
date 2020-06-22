const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");

//const bodyParser = require("body-parser");
const axios = require("axios");

const URL = `http://localhost:3000/api/user`;

const app = express();

app.use(express.json());
app.use(cors());
//app.use(bodyParser.urlencoded()); // Com essa configuração, vamos conseguir parsear o corpo das requisições

app.set("view engine", "ejs"); // Setamos que nossa engine será o ejs
//app.use("/public", express.static(__dirname + "/public"));

//BANCO
mongoose.connect("mongodb://localhost:27017/nodeapi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//REUISICOES
requireDir("./src/models");

//ROTAS
app.use("/api/user", require("./src/routes"));
app.use("/api", require("./src/routes"));

//CONSUMINDO A API
app.get("/", async (req, res) => {
  const response = await axios.get(URL);
  res.render("home", { user: response.data });
});

app.get("/call/:id", async (req, res) => {
  const url = `http://localhost:3000/api/user/call/${req.params.id}`;

  const response = await axios.get(url);
  res.render("call", { user: response.data });
});

var Peer = require("simple-peer");
var wrtc = require("wrtc");

var peer1 = new Peer({ initiator: true, wrtc: wrtc });
var peer2 = new Peer({ wrtc: wrtc });
peer1.on("signal", (data) => {
  peer2.signal(data);
});
peer2.on("signal", (data) => {
  peer1.signal(data);
});

peer2.on("stream", (stream) => {
  // got remote video stream, now let's show it in a video tag
  var video = document.querySelector("video");

  if ("srcObject" in video) {
    video.srcObject = stream;
  } else {
    video.src = window.URL.createObjectURL(stream); // for older browsers
  }

  video.play();
});

app.listen(3000, console.log("Server Conncted"));

//comandos mongo
// instal:  docker pull mongo
// docker run --name mongodb -p 27017:27017 id mongo
//docker ps
//docker ps -a //ver os pausados
//docker start mongo // restartar
