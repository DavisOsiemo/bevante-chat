import { Component } from 'bot-designer';

const options = [
  'Order a product',
  // 'My account',
];

export const MainMenu: Component = async ({ onSendMessage, history, ...props }) => {
  const flow = history.createFlow(
    ['WELCOME_SCREEN', 'SELECT_OPTION'],
    'cancel',
    'Cancelled. \n\nOptions:\n- Main Menu',
  );

  flow.start();

  switch (flow.getCurrentStep()) {
    case 'WELCOME_SCREEN': {
      let text = 'Welcome to *Bevanté!*';
      text += '\n\nUse me to easily order goods on WhatsApp\n\n';
      text += options
        .map((option, idx) => `*${idx + 1}* ${option}`)
        .join('\n');

      onSendMessage(text, {
        telegram: {
          parse_mode: 'Markdown',
          reply_markup: {
            keyboard: options
              .map((option, idx) => [`${idx + 1} ${option}`]) as any,
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        },
      });

      flow.next();
      break;
    }

    case 'SELECT_OPTION': {
      flow.end();

      const idx = parseInt(props.text, 10) - 1;

      if (Number.isNaN(idx)) {
        props.render(props.text);
      } else if (idx >= options.length || idx < 0) {
        props.render('**');
      } else {
        props.render(options[idx]);
      }

      break;
    }

    default: {
      flow.end();
      break;
    }
  }
};
