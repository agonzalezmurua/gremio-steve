import config from './config';
import notifier from 'node-notifier';

export default {
  notify: function (title: string, message: string) {
    notifier.notify({
      title,
      message,
      icon: config.icon_path,
      sound: true,
    });
  },
};
