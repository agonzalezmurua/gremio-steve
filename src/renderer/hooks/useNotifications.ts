import { useCallback, useEffect, useRef } from 'react';

import * as IpcEvents from 'common/ipc.events';

import { isBrowser, isElectron } from '_/constants/platform';
import sendIpcMainEvents from '_/utils/sendIpcMainEvent';

function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }

  return true;
}

function notify(title: string, message: string) {
  if (isElectron) {
    sendIpcMainEvents(IpcEvents.Main.Events.send_notification, {
      title,
      message,
    });
  } else {
    new Notification(title, { body: message });
  }
}

const useNotifications = () => {
  const didAskForPermissions = useRef(checkNotificationPromise());
  const askForWebPermission = useCallback(() => {
    // function to actually ask the permissions
    function handlePermission() {
      // set the button to shown or hidden, depending on what the user answers
      if (
        Notification.permission === 'denied' ||
        Notification.permission === 'default'
      ) {
        // notificationBtn.style.display = 'block';
      } else {
        // notificationBtn.style.display = 'none';
      }
    }
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
    } else {
      if (didAskForPermissions.current === true) {
        return;
      }
      if (checkNotificationPromise()) {
        Notification.requestPermission().then(handlePermission);
      } else {
        Notification.requestPermission(handlePermission);
      }
      didAskForPermissions.current = true;
    }
  }, []);

  const createNotification = useCallback((title: string, message: string) => {
    notify(title, message);
  }, []);

  useEffect(() => {
    if (isBrowser) {
      switch (Notification.permission) {
        case 'granted':
        case 'denied':
          return;
        case 'default':
          return askForWebPermission();
        default:
          break;
      }
    }
  }, []);

  return {
    create: createNotification,
    askForPermission: askForWebPermission,
  };
};

export default useNotifications;
