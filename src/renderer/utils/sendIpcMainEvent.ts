import * as IpcEvents from 'common/ipc.events';

/** Send a IPC event to the main thread */
export default function sendIpcMainEvents(
  event: IpcEvents.Main.Events,
  payload?: Record<string, any>
) {
  window.electron.ipcRenderer.send(event, payload);
}
