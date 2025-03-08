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


client.on("ready", () => {
  console.log(`> Bot is on ready`);
  client.user?.setActivity('Honkai Star:Rail', { type: ActivityType.Playing });
});


// client.login(process.env.TOKEN);

client.login(process.env.TOKEN).then(async () => {
  await SoundCloud.connect();
  
  bootstrap(client);
});



