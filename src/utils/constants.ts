import config from 'config';
import { Constants } from './constants.types';

export const constants: Constants = {
  telegram: config.get('telegram'),
  africastalking: config.get('africastalking'),
};
