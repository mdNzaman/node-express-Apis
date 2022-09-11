const express = require("express");
const app = express();
const router = require("./routers/routes");
const { Server } = require("socket.io");
const port = process.env.PORT || 4000;
const saveChatMessageModel = require("./models/saveChatMessageModel");
const notificationToReceiverController = require ("./controllers/notificationToReceiverController");
var cron = require('node-cron');
const { expireHistoricalData } = require("./controllers/getHistoricalDataController");

app.use(express.json());

// cron.schedule("*/1 * * * *", () => {

//     expireHistoricalData();
//     // console.log(getHistoricalDataDetails);
// })

var socketserver = require('http').createServer();

const io = new Server(socketserver, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  
app.get("/",(req,res)=>{
    console.log("apis working..");
    res.status(200).json({
        success:1,
        message:"apis working.."
    });
});

// app.use("/flok22/app/v1/",router);
app.use("/api",router);

var roomno = 1;

 const connnections = [];

io.on('connection', (socket) => {
    console.log('New user connected');


    socket.on('join', function(data) {
        console.log("User Joined");
        if (data.chat_id != null){
            roomno = data.chat_id;

            console.log("room num",roomno);
            socket.join("room-" + roomno);
        }      
    });

     connnections.push(socket);

    socket.on('send_message', (data) => {
        var message_id = 0;
        var sender_id = data.sender_id;
        var receiver_id = data.receiver_id;
        var message = data.message;
        var chat_id = data.chat_id;
        var created_datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        console.log("chat_id",chat_id);
        io.sockets.in("room-"+chat_id).emit('receive_message', {message : data.message, sender_id: sender_id, receiver_id:receiver_id, messaged_at: created_datetime});
        saveChatMessageModel.saveChatMessage(chat_id, sender_id, receiver_id, message, created_datetime, function (err,result) {
            if(err){
                console.log('message_error'+err);
            } else{               
                var message_id = result.insertId;               
                notificationToReceiverController.notificationToReceiver(sender_id, receiver_id, chat_id, message_id);
                console.log('succees_message ' + message_id);
            }
        });
        
       console.log({message : data.message, receiver_id: receiver_id, sender_id: sender_id, messaged_at: created_datetime, message_id: message_id});

    });
});

socketserver.listen(4010); // Socket.IO, port 3001

app.listen(port,()=>{
    console.log(`server on and running at port: ${port}`);
});