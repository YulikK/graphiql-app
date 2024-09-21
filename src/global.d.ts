import en from './shared/locales/messages/en.json';

type Messages = typeof en;

declare global {
  type IntlMessages = Messages;
}
