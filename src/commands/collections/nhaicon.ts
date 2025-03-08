import messages from '@/constants/messages';
import { Client, CommandInteraction } from 'discord.js';

export const nhaicon = {
  name: 'nhaicon',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    try{
         // Kiểm tra xem input có tồn tại không\
      
      const inputOption = interaction.options.get('input');
      if (!inputOption || !inputOption.value) {
        await interaction.reply('❌ Bạn cần nhập nội dung tin nhắn!');
        return;
      }
      
      const input = inputOption.value as string;
      
      // Chỉ defer nếu cần thời gian xử lý
      await interaction.deferReply();
      await interaction.editReply(input);
    }
    catch(error){
      await interaction.editReply("lỗi ")
    }
  },
};
