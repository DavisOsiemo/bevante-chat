import { Component } from 'bot-designer';

export const NotFound: Component = ({ onSendMessage }) => {
  const text = 'Sorry I did not get that. \n\nOptions:\n- Main Menu';

  onSendMessage(text, {
    telegram: {
      parse_mode: 'Markdown',
      reply_markup: {
        keyboard: [
          ['Main Menu'] as any,
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    },
  });
};
