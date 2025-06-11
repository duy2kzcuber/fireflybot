import { config } from "dotenv";
import {bootstrap} from "./commands/index"
import { scdl } from './services/soundcloud';
const express = require('express');
config();

if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}

import { ActivityType, Client, GatewayIntentBits } from "discord.js";
import { SoundCloud } from "scdl-core";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.MessageContent, 
  ],
});

let startTime = Date.now();

client.on("ready", () => {
  
  console.log(`> Bot is on ready`);
  updatePresence();
  setInterval(updatePresence,1000);
});

function updatePresence() {
    const diff = Date.now() - startTime;

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)));

    const uptimeString = `${hours} giờ ${minutes} phút ${seconds} giây`;

    client.user?.setPresence({
        activities: [{
            name: `Honkai Star Rail: ${uptimeString}`,
            type: ActivityType.Playing
        }],
        status: 'online'
    });
}
// client.login(process.env.TOKEN);

client.login(process.env.TOKEN).then(async () => {
  await SoundCloud.connect();
  
  bootstrap(client);
});

const app = express();
app.use(express.json());
const router = require('express').Router();
const path = require('path');
app.set('views', path.join(__dirname,"views")); // __dirname: tên thư mục gốc
app.set('view engine', 'pug');
app.use('/',function(req: any,res: { render: (arg0: string) => void; }){
  console.log(req);
  res.render('index');
});
app.listen(3000,'0.0.0.0', () => {
  console.log(`Example app listening on port ${3000}`)
})



