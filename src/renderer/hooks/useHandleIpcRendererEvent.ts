import { useMemo } from 'react';
import { useEffectOnce } from 'react-use';
import * as IpcEvents from 'common/ipc.events';
import { isBrowser } from '_/constants/platform';

/**
 * Handles a event emitted by the renderer process by registering
 * a given function to handler a ipcEventRender
 *
 * This method is the equivalent of registering the event manually along with the handling of unregistering
 *
 * Please note that:
 * - Only works on the APP instance
 * - The given handler is internally memoized, only once
 *
 * @param channel event to subscribe to
 * @param handler function to execute
 */
export default function useHandleIpcRendererEvent(
  channel: IpcEvents.Renderer.Events,
  handler: (...args: any[]) => void
) {
  const memoizedHandler = useMemo(() => handler, []);

  // Event registration
  useEffectOnce(() => {
    if (isBrowser === false) {
      window.electron.ipcRenderer.on(channel, memoizedHandler);
      return () => window.electron.ipcRenderer.off(channel, memoizedHandler);
    }
  });
}
