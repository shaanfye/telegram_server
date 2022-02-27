const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');


const key1 = process.env.TG_API;
const bot = new TelegramBot(key1, {polling:true});

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.options('/log', cors());
app.post('/log', function (req, res) {
  console.log(req.body);
  var link_l = '';
  link_l += '\u{1F4A3}   ' + '<b>' + req.body.summary + '</b>' +'\n'+'_____________________' + '\n\n';
  // for (var link of req.body.content) {
  //   console.log(link);
  //   link_l += "\u{1F604}   " + link.toString() + '\n\n';
  // }

  for (var pair of req.body.updated_content) {
    console.log(pair);
    link_l += "\u{1F64A}   " + pair[0].toString() + '\n';
    link_l += "\u{1F604}   " + pair[1].toString() + '\n\n';
  }


  bot.sendMessage('@shaan_reads', link_l, {parse_mode: "HTML", disable_web_page_preview: "true"});

})

app.listen(PORT);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
  
  });

bot.onText(/\/echo (.+)/, function onEchoText(msg, match) {
  const resp = match[1];
  bot.sendMessage(msg.chat.id, resp);
});