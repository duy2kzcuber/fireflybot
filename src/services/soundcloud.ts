import { soundCloudPlaylistRegex, soundCloudTrackRegex } from '@/constants/regex';
import { Playlist } from '@/types/Playlist';
import { Platform, Song } from '@/types/Song';
import { SoundCloud } from 'scdl-core';

// Khởi tạo SoundCloud API
export const scdl = new SoundCloud();

export class SoundCloudService {
  public static async getTrackDetails(content: string): Promise<Song> {
    try {
      let url = '';
      const paths = content.match(soundCloudTrackRegex);
      if (!paths) {
        url = await this.searchTrack(content);
      } else {
        url = paths[0];
      }

      if (!url) throw new Error(`⚠️ Track not found for input: ${content}`);

      // ⚠️ Sửa lại cách lấy thông tin track
      const track = await SoundCloud.tracks.getTrack(url);
      if (!track) throw new Error('⚠️ Cannot fetch track details.');

      return {
        title: track.title,
        length: track.duration / 1000,
        author: track.user.username,
        thumbnail: track.artwork_url ?? '',
        url,
        platform: Platform.SOUND_CLOUD,
      };
    } catch (error) {
      console.error("❌ Error in getTrackDetails:", error);
      throw new Error("Failed to get track details.");
    }
  }

  public static async getPlaylist(url: string): Promise<Playlist> {
    try {
      // ⚠️ Sửa lại cách lấy playlist
      const playlist = await SoundCloud.playlists.getPlaylist(url);
      if (!playlist) throw new Error("⚠️ Playlist not found.");

      const songs: Song[] = playlist.tracks.map((track) => ({
        title: track.title,
        thumbnail: track.artwork_url ?? '',
        author: track.user.username,
        url: track.permalink_url,
        length: track.duration / 1000,
        platform: Platform.SOUND_CLOUD,
      }));

      return {
        title: playlist.title,
        thumbnail: playlist.artwork_url ?? '',
        author: playlist.user.username,
        songs,
      };
    } catch (error) {
      console.error("❌ Error in getPlaylist:", error);
      throw new Error("Failed to get playlist.");
    }
  }

  public static isPlaylist(url: string): string | null {
    const paths = url.match(soundCloudPlaylistRegex);
    return paths ? paths[0] : null;
  }

  private static async searchTrack(keyword: string): Promise<string> {
    try {
      const res = await SoundCloud.search({
        query: keyword,
        filter: 'tracks',
      });

      if (res.collection.length === 0) {
        throw new Error(`⚠️ No results found for: ${keyword}`);
      }

      return res.collection[0].permalink_url;
    } catch (error) {
      console.error("❌ Error in searchTrack:", error);
      return '';
    }
  }
}
