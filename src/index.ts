import { BotDesigner, atChatPlugin, telegramPlugin } from 'bot-designer';
import { constants } from './utils/constants';
import { routes } from './routes';

const botDesigner = BotDesigner();

botDesigner.setRoutes(routes);

const {
  telegram: { token },
  africastalking: { apiKey, username, chat },
} = constants;

botDesigner.use(telegramPlugin(token));
botDesigner.use(atChatPlugin(apiKey, username, chat));
