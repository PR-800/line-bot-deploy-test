require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

const line = require("./utils/line");
const gemini = require("./utils/gemini");


app.post('/webhook', async (req, res) => {
  console.log("📥 ได้รับ LINE webhook payload:");
  console.log(JSON.stringify(req.body, null, 2));

  const events = req.body.events;
  
  if (Array.isArray(events)) {
    for (const event of events) {
      try {
        switch (event.type) {
          case "message":
            if (event.message.type === "text") {
              console.log("Receive: ", event.message.text);
              const msg = await gemini.chat(event.message.text);
              console.log("Response: ", msg);

              await line.reply(event.replyToken, [{ type: "text", text: msg }]);
              break;
            }
            if (event.message.type === "image") {
              console.log("Receive: ", event.message.id);
              const imageBinary = await line.getImageBinary(event.message.id);
              const msg = await gemini.multimodal(imageBinary);
              console.log("Response: ", msg);

              await line.reply(event.replyToken, [{ type: "text", text: msg }]);
              break;
            }
            break;
        }
      } catch (error) {
        console.error('Error handling event:', error);
      }
    }
  }
  else {
    console.warn("Events not found:", req.body);
  }
  res.send(req.method);
});


// app.post('/webhook', async (req, res) => {
//   // console.log('📨 Received LINE event:', JSON.stringify(req.body, null, 2));
//   // res.sendStatus(200);
//   const events = req.body.events;
//     for (const event of events) {
//       switch (event.type) {
//         case "message":
//           if (event.message.type === "text") {
//             const msg = await gemini.chat(event.message.text);
//             await line.reply(event.replyToken, [{ type: "text", text: msg }]);
//             break;
//           }
//           if (event.message.type === "image") {
//             const imageBinary = await line.getImageBinary(event.message.id);
//             const msg = await gemini.multimodal(imageBinary);
//             await line.reply(event.replyToken, [{ type: "text", text: msg }]);
//             break;
//           }
//           break;
//       }
//     }
//   res.send(req.method);
// });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});