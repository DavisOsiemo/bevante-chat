import { Component } from 'bot-designer';
import moment from 'moment';
import { fetchAllUsers } from '../models';

const options = [
  'My plan',
  'Account Statement',
];

export const MyAccount: Component = async ({ history, onSendMessage, ...props }) => {
  const flow = history.createFlow(
    ['VIEW_ACCOUNT_OPTIONS', 'VIEW_OPTION'],
    'cancel',
    'Cancelled. \n\nOptions:\n- Main Menu',
  );

  flow.start();

  switch (flow.getCurrentStep()) {
    case 'VIEW_ACCOUNT_OPTIONS': {
      let text = '*My account*\n\n';
      text += options
        .map((option, idx) => `*${idx + 1}* ${option}`)
        .join('\n');

      onSendMessage(text, {
        telegram: {
          parse_mode: 'Markdown',
          reply_markup: {
            keyboard: [
              ...options.map((option, idx) => [`${idx + 1} ${option}`]),
              ['Main Menu'],
            ] as any,
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        },
      });

      flow.next();
      break;
    }

    case 'VIEW_OPTION': {
      flow.end();

      const idx = parseInt(props.text, 10) - 1;

      if (Number.isNaN(idx)) {
        props.render(props.text);
      } else if (idx >= options.length || idx < 0) {
        props.render('**');
      } else {
        const user = (await fetchAllUsers())[0];

        if (idx === 0) {
          const totalDailyPayments = user.statements.length;
          const totalPayments = user.statements.reduce((a, c) => a + c.amountPaid, 0);

          let text = '*My Plan*\n\n';
          text += '*Outstanding Loan* \n';
          text += `Your plan has a loan amount of *${user.loan.currency} ${user.loan.amount}*. \n`;
          text += `You have made total payments of *${user.loan.currency} ${totalPayments}*. \n`;
          text += `You have a loan balance of *${user.loan.currency} ${user.loan.amount - totalPayments}*. \n\n`;
          text += '*Daily Rate* \n';
          text += `Your daily rate is *${user.loan.currency} ${user.loan.dailyRate}*. \n\n`;
          text += '*Remaining Days* \n';
          text += `Your current plan has a total of *${user.loan.totalDays}* days. \n`;
          text += `You have successfully made payments for *${totalDailyPayments}* days. \n`;
          text += `You have *${user.loan.totalDays - totalDailyPayments}* days remaining. \n\n`;
          text += 'Options:\n- Main Menu';

          onSendMessage(text, {
            telegram: {
              parse_mode: 'Markdown',
              reply_markup: {
                keyboard: [
                  ['Main Menu'],
                ] as any,
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            },
          });
        } else if (idx === 1) {
          let text = '*Account Statement*\n\n';
          text += user.statements
            .map((statement) => {
              let text2 = `*${moment(statement.createdAt).format('llll')}* \n`;
              text2 += `Amount paid: *${statement.currency} ${statement.amountPaid}* \n`;
              text2 += `Loan balance: *${statement.currency} ${statement.amountRemaining}*`;

              return text2;
            })
            .join('\n\n');

          text += '\n\nOptions:\n- Main Menu';

          onSendMessage(text, {
            telegram: {
              parse_mode: 'Markdown',
              reply_markup: {
                keyboard: [
                  ['Main Menu'],
                ] as any,
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            },
          });
        }
      }

      break;
    }

    default: {
      flow.end();
      break;
    }
  }
};
