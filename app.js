const express = require("express");
const app = express();
const router = require("./routers/routes");
const { Server } = require("socket.io");
const port = process.env.PORT
var cron = require('node-cron');

app.use(express.json());

// cron.schedule("*/1 * * * *", () => {

//     expireHistoricalData();
//     // console.log(getHistoricalDataDetails);
// })

var socketserver = require('http').createServer();

// const io = new Server(socketserver, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//     },
//   });
  
app.get("/",(req,res)=>{
    console.log("apis working..");
    res.status(200).json({
        success:1,
        message:"apis working.."
    });
});

app.use("/api",router);

// socketserver.listen(3210); // Socket.IO, port 4211

app.listen(port,()=>{
    console.log(`server on and running at port: ${port}`);
});
