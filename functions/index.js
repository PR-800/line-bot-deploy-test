const express = require('express');
const app = express();
const port = 3000;

const line = require("./utils/line");
const gemini = require("./utils/gemini");

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const events = req.body.events;
    for (const event of events) {
      switch (event.type) {
        case "message":
          if (event.message.type === "text") {
            const msg = await gemini.chat(event.message.text);
            await line.reply(event.replyToken, [{ type: "text", text: msg }]);
            break;
          }
          if (event.message.type === "image") {
            const imageBinary = await line.getImageBinary(event.message.id);
            const msg = await gemini.multimodal(imageBinary);
            await line.reply(event.replyToken, [{ type: "text", text: msg }]);
            break;
          }
          break;
      }
    }
  res.send(req.method);
});
