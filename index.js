const express = require("express");
const gcm = require("node-gcm");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const server_key = "AAAATFrNaLw:APA91bHYtvDXtJrGFjJMNQeKFVkR156HKhsyPK91IrcVezTh-dDTXr1Z_UGQ6_rOjfTBMH6Zp7hJhBJJ-6MuCV0DNabGkCLUtaQAMu_HAYCx9cqAUfP3UbhwXHUPWPlb-BSLE_Z_BrUZ"; // server key

var send = (token) => {
    let retry_times = 3;
    let sender = new gcm.Sender(server_key);
    let message = new gcm.Message();
    message.addData("title", "Hello");
    message.addData("message", "World");
    sender.send(message, token, retry_times, (result) => {
        console.log("Send notification");
    }, (err) => {
        console.log("Cannot send notification");
    })
}

app.get("/", (req, res) => {
    res.send("This is basic route");
});


app.post("/open", (req, res) => {
    /*insert token to DB*/
    let token = req.body.token.registrationId;
    console.log(JSON.stringify(token));
    send(token);
})

app.get("/send", (req, res) => {
    let token = "XXXXXXXXXXXXX"; //token
    send(token);
    res.send("Send notification");
})

app.listen(5555, () => {
    console.log("Program running on port : 5555");
});