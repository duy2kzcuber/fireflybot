import messages from '@/constants/messages';
import { Client } from 'discord.js';
import { deploy } from './collections/deploy';
import { help } from './collections/help';
import { ping } from './collections/ping';
import { play } from './collections/play';
import { nhaicon } from './collections/nhaicon';


export const bootstrap = (client: Client): void => {
  deploy(client);

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guildId) return;
    try {
      switch (interaction.commandName) {
        case play.name:
          play.execute(interaction);
          break;
        case ping.name:
          ping.execute(client, interaction);
          break;
        case help.name:
          help.execute(interaction);
          break;
        case nhaicon.name:
          nhaicon.execute(interaction);
          break;
      }
    } catch (e) {
      interaction.reply(messages.error);
    }
  });
};
