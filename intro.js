process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require("cluster");

if (cluster.isMaster) {
  console.log("master");
  cluster.fork();
  cluster.fork();
} else {
  console.log("fork");
  const express = require("express");
  const crypto = require("crypto");
  const app = express();
  const start = Date.now();

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("yo sup");
    });
  });
  app.get("/fast", (req, res) => {
    res.send("yo sup fast route");
  });
  app.listen(3000);
}
// ______________________________
// pm2 commands:
// pm2 start server.js -i 0
// pm2 show server
// pm2 monit
// pm2 delete server.js
// ________________________________
// worker example with webworker-threads library:

// const Worker = require("webworker-threads").Worker;
//
// app.get("/", (req, res) => {
//   const worker = new Worker(function() {
//     this.onmessage = function() {
//       let counter = 0;
//       while (counter < 1e9) {
//         counter++;
//       }
//       postMessage(counter);
//     };
//   });
//
//   worker.onmessage = function(message) {
//     res.send(`${message.data}`);
//   };
// });
