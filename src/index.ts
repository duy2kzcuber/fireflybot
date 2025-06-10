import { config } from "dotenv";
import {bootstrap} from "./commands/index"
import { scdl } from './services/soundcloud';
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



