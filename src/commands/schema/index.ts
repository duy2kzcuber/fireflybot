// Danh sách các slash command của bot
import { ApplicationCommandData, ApplicationCommandOptionType } from 'discord.js';

export const schema: ApplicationCommandData[] = [
  {
    name: 'play',
    description: 'Plays a song or playlist on Youtube',
    options: [
      {
        name: 'input',
        type: ApplicationCommandOptionType.String,
        description:
          'The url or keyword to search videos or playlist on Youtube',
        required: true,
      },
    ],
  },
  {
    name: 'ping',
    description: 'See the ping to server',
  },
  {
    name: 'help',
    description: 'See the help for this bot',
  },
  {
    name: 'nhaicon',
    description: 'Nhái lại tin nhắn',
    options: [
      {
        name: 'input',
        type: ApplicationCommandOptionType.String,
        description:
          'The url or keyword to search videos or playlist on Youtube',
        required: true,
      },
    ],
  },
];
