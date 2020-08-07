import { Component } from 'bot-designer';
import joi from '@hapi/joi';
import { fetchAllCountries, fetchAllProductsByCountryId } from '../models';
import { validateJoiSchema } from '../utils/misc';

export const OrderProduct: Component = async ({ onSendMessage, history, ...props }) => {
  const flow = history.createFlow(
    ['SELECT_COUNTRY', 'SELECT_PRODUCT', 'VIEW_PRODUCT', 'INPUT_NAME', 'INPUT_LOCATION', 'INPUT_ID', 'FINAL'],
    'Cancel',
    'Cancelled. \n\nOptions:\n- Main Menu',
  );

  const cancelPrompt = '\n\n_To stop this, reply with: Cancel_';

  flow.start();

  switch (flow.getCurrentStep()) {
    case 'SELECT_COUNTRY': {
      const countries = await fetchAllCountries();

      let text = '*Order your product* \n\n';
      text += 'Where in Nairobi are you in? \n\n';
      text += countries
        .map((country, idx) => `*${idx + 1}* ${country.title}`)
        .join('\n');
      text += cancelPrompt;

      onSendMessage(text, {
        telegram: {
          parse_mode: 'Markdown',
          reply_markup: {
            keyboard: [
              ...countries.map((country, idx) => [`${idx + 1} ${country.title}`]),
              ['Cancel'],
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

    case 'SELECT_PRODUCT': {
      const countries = await fetchAllCountries();
      const idx = parseInt(props.text, 10) - 1;

      if (Number.isNaN(idx)) {
        flow.end();
        props.render(props.text);
      } else if (idx >= countries.length || idx < 0) {
        flow.end();
        props.render('**');
      } else {
        const country = countries[idx];

        history.setState({ ...history.getState(), countryId: country.id });

        const products = await fetchAllProductsByCountryId(country.id);

        let text = `*Order a product: ${country.title}* \n\n`;
        if (products.length > 0) {
          text += 'Which product would you like to order? \n\n';
          text += products
            .map((product, idx2) => `*${idx2 + 1}* ${product.title}`)
            .join('\n');
          text += cancelPrompt;
          flow.next();
        } else {
          text += `Oops 😥, currently we don't have goods available for purchase in ${country.title}.`;
          text += '\n\nOptions:\n-Main Menu';
          flow.end();
        }

        onSendMessage(text, {
          telegram: {
            parse_mode: 'Markdown',
            reply_markup: {
              keyboard: [
                ...products.map((product, idx2) => [`${idx2 + 1} ${product.title}`]),
                products.length > 0 ? ['Cancel'] : undefined,
                ['Main Menu'],
              ].filter((x) => !!x) as any,
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          },
        });
      }

      break;
    }

    case 'VIEW_PRODUCT': {
      const { countryId } = history.getState();
      const products = await fetchAllProductsByCountryId(countryId);
      const idx = parseInt(props.text, 10) - 1;

      if (Number.isNaN(idx)) {
        flow.end();
        props.render(props.text);
      } else if (idx >= products.length || idx < 0) {
        flow.end();
        props.render('**');
      } else {
        const product = products[idx];

        history.setState({ ...history.getState(), productId: product.id });

        let text = `*${product.title}* \n\n`;
        text += `${product.description} \n\n`;
        text += '*Options:*';
        text += '\n*1:* Order this product';
        text += cancelPrompt;

        await onSendMessage(text, {
          telegram: {
            parse_mode: 'Markdown',
            reply_markup: {
              keyboard: [
                ['1: Order this product'],
                ['Cancel'],
                ['Main Menu'],
              ] as any,
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          },
        });

        await props.onSendPhoto?.(product.image);
      }

      flow.next();
      break;
    }

    case 'INPUT_NAME': {
      const options = ['1: Order this product'];
      const idx = parseInt(props.text, 10) - 1;

      if (Number.isNaN(idx)) {
        flow.end();
        props.render(props.text);
      } else if (idx >= options.length || idx < 0) {
        flow.end();
        props.render('**');
      } else {
        let text = 'Awesome! Let me ask you a few questions to capture your order details.';
        text += '\n\n    *Please enter your full name*';
        text += cancelPrompt;

        await onSendMessage(text, {
          telegram: {
            parse_mode: 'Markdown',
            reply_markup: {
              keyboard: [
                ['Cancel'],
                ['Main Menu'],
              ] as any,
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          },
        });
      }

      flow.next();
      break;
    }

    case 'INPUT_LOCATION': {
      const schema = joi.object({
        name: joi.string().min(2).max(255).required(),
      }).options({ abortEarly: false }).required();

      try {
        const { name } = validateJoiSchema<{ name: string }>(schema, { name: props.text });

        history.setState({ ...history.getState(), name });

        let text = 'Alright! Tell me a more *precise location*? e.g. Epic apartments, near Total Kitisuru';
        text += cancelPrompt;

        onSendMessage(text, {
          telegram: {
            parse_mode: 'Markdown',
            reply_markup: {
              keyboard: [
                ['Cancel'],
                ['Main Menu'],
              ] as any,
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          },
        });

        flow.next();
      } catch (err) {
        onSendMessage(`${err.message}. \n\nPlease try again. \n\n${cancelPrompt}`, {
          telegram: {
            parse_mode: 'Markdown',
            reply_markup: {
              keyboard: [
                ['Cancel'],
                ['Main Menu'],
              ] as any,
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          },
        });
      }

      break;
    }

    case 'INPUT_ID': {
      const schema = joi.object({
        location: joi.string().min(2).max(255).required(),
      }).options({ abortEarly: false }).required();

      try {
        const {
          location,
        } = validateJoiSchema<{ location: string }>(schema, { location: props.text });

        history.setState({ ...history.getState(), location });

        let text = 'We\'re almost done ⌛️⌛️! What is your National ID Number?';
        text += cancelPrompt;

        onSendMessage(text, {
          telegram: {
            parse_mode: 'Markdown',
            reply_markup: {
              keyboard: [
                ['Cancel'],
                ['Main Menu'],
              ] as any,
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          },
        });

        flow.next();
      } catch (err) {
        onSendMessage(`${err.message}. \n\nPlease try again. \n\n${cancelPrompt}`, {
          telegram: {
            parse_mode: 'Markdown',
            reply_markup: {
              keyboard: [
                ['Cancel'],
                ['Main Menu'],
              ] as any,
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          },
        });
      }

      break;
    }

    case 'FINAL': {
      const schema = joi.object({
        idNumber: joi.string().min(8).max(9).required(),
      }).options({ abortEarly: false }).required();

      try {
        const {
          idNumber,
        } = validateJoiSchema<{ idNumber: string }>(schema, { idNumber: props.text });

        history.setState({ ...history.getState(), idNumber });

        // eslint-disable-next-line no-console
        console.log(history.getState());

        let text = 'Successful! 🎉';
        text += '\n\nWe have noted down your order and passed it along for processing. A representative will be in touch with you.';
        text += '\n\nThanks for shopping at Bevanté.';
        text += '\n\nOptions:\n-Main Menu';

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

        flow.end();
      } catch (err) {
        onSendMessage(`${err.message}. \n\nPlease try again. \n\n${cancelPrompt}`, {
          telegram: {
            parse_mode: 'Markdown',
            reply_markup: {
              keyboard: [
                ['Cancel'],
                ['Main Menu'],
              ] as any,
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          },
        });
      }

      break;
    }

    default: {
      flow.end();
      break;
    }
  }
};
