const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

const line = require("./utils/line");
const gemini = require("./utils/gemini");


app.post('/webhook', async (req, res) => {
  console.log('Received LINE Event:', req.body);
  res.sendStatus(200);
  // const events = req.body.events;
  //   for (const event of events) {
  //     switch (event.type) {
  //       case "message":
  //         if (event.message.type === "text") {
  //           const msg = await gemini.chat(event.message.text);
  //           await line.reply(event.replyToken, [{ type: "text", text: msg }]);
  //           break;
  //         }
  //         if (event.message.type === "image") {
  //           const imageBinary = await line.getImageBinary(event.message.id);
  //           const msg = await gemini.multimodal(imageBinary);
  //           await line.reply(event.replyToken, [{ type: "text", text: msg }]);
  //           break;
  //         }
  //         break;
  //     }
  //   }
  // res.send(req.method);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});