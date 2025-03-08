import messages from '@/constants/messages';
import { Platform } from '@/types/Song';
import { formatSeconds } from '@/utils/formatTime';
import { EmbedBuilder } from 'discord.js';

export const createPlayMessage = (payload: {
  title: string;
  url: string;
  author: string;
  thumbnail: string;
  type: 'Song' | 'Playlist';
  length: number;
  platform: Platform;
  requester: string;
}): EmbedBuilder => {
  const authorField = {
    name: messages.author,
    value: payload.author,
    inline: true,
  };
  const lengthField = {
    name: messages.length,
    value:
      payload.type === 'Playlist'
        ? payload.length.toString()
        : formatSeconds(payload.length),
    inline: true,
  };
  const typeField = {
    name: messages.type,
    value: payload.type,
    inline: true,
  };

  return new EmbedBuilder()
    .setTitle(payload.title)
    .setURL(payload.url)
    .setAuthor({ name: `${messages.addedToQueue} ${payload.requester}` })
    .setThumbnail(payload.thumbnail)
    .addFields(authorField, lengthField, typeField);
};