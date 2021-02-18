import { useMemo } from 'react';
import { useEffectOnce } from 'react-use';
import * as IpcEvents from 'common/ipc.events';
import { isBrowser } from '@/constants/platform';

/**
 * Registers a given function to handler a ipcEventRender
 * this method is the equivalent of registering the event manually along with the handling of unregistering
 *
 * Also the given handler is internally memoized, only once
 * @param channel event to subscribe to
 * @param handler
 */
export default function useIpcRendererEvent(
  channel: IpcEvents.Renderer,
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
