import { Route } from 'bot-designer';
import { NotFound } from './components/NotFound';
import { MainMenu } from './components/MainMenu';
import { OrderProduct } from './components/OrderProduct';
import { MyAccount } from './components/MyAccount';

export const routes: Route[] = [
  {
    path: '**',
    component: NotFound,
  },
  {
    path: 'menu',
    aliases: ['start', 'main menu'],
    component: MainMenu,
  },
  {
    path: 'order',
    aliases: ['order a product', 'order product'],
    component: OrderProduct,
  },
  {
    path: 'account',
    aliases: ['my account'],
    component: MyAccount,
  },
];
