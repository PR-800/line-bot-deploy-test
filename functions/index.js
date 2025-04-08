// index.js

const express = require('express');
const bodyParser = require('body-parser');
const line = require('./utils/line'); // ยังใช้ได้เหมือนเดิม

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const events = req.body.events;
  for (const event of events) {
    switch (event.type) {
      case 'message':
        if (event.message.type === 'text') {
          // reply logic
        }
        if (event.message.type === 'image') {
          // reply logic
        }
        break;
    }
  }
  res.send('OK');
});

app.listen(port, () => {
  console.log(`LINE webhook listening on port ${port}`);
});

// scp -i ~/Desktop/LineBotTest/line-ws-key.pem -r ./functions ec2-user@18.142.57.162:/home/ec2-user/myproject/


// // Import dependencies
// const {onRequest} = require("firebase-functions/v2/https");
// const line = require("./utils/line");

// // Create a webhook via HTTP requests
// exports.webhook = onRequest(async (req, res) => {
//   if (req.method === "POST") {
//     const events = req.body.events;
//     for (const event of events) {
//       switch (event.type) {
//         case "message":
//           if (event.message.type === "text") {
//           }
//           if (event.message.type === "image") {
//           }
//           break;
//       }
//     }
//   }
//   res.send(req.method);
// });


