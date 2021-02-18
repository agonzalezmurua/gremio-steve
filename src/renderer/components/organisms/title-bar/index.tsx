import tw, { styled } from 'twin.macro';
import React, { useCallback } from 'react';

import Close from '@/assets/icons/outline/x.svg';
import Minimize from '@/assets/icons/outline/minus.svg';
import Maximize from '@/assets/icons/outline/duplicate.svg';
import { isBrowser, currentPlatform } from '@/constants/platform';
import * as IpcEvents from 'common/ipc.events';

const TopMenu: React.FC = (props) => {
  const handleMinimize = useCallback(() => {
    window.electron.ipcRenderer.send(IpcEvents.Main.minimize_main_window);
  }, []);

  const handleMaximize = useCallback(() => {
    window.electron.ipcRenderer.send(IpcEvents.Main.maximize_main_window);
  }, []);

  const handleClose = useCallback(() => {
    window.electron.ipcRenderer.send(IpcEvents.Main.close_main_window);
  }, []);

  return (
    <div
      {...props}
      tw="flex justify-end h-8 w-full border-b light:(border-gray-200) dark:(border-black)"
    >
      {currentPlatform === 'win32' ? (
        <>
          <button onClick={handleMinimize}>
            <Minimize />
          </button>
          <button onClick={handleMaximize}>
            <Maximize />
          </button>
          <button id="close" onClick={handleClose}>
            <Close />
          </button>
        </>
      ) : null}
    </div>
  );
};

export default styled(TopMenu)`
  ${isBrowser ? tw`hidden` : null}
  -webkit-app-region: drag;
  button {
    -webkit-app-region: no-drag;
    ${tw`flex items-center h-full px-3 cursor-default transition-colors duration-100`}
    ${tw`light:hover:(bg-gray-200 active:bg-gray-300) dark:hover:(bg-gray-600 active:bg-gray-700)`}
    &#close {
      ${tw`hover:bg-red-500 active:bg-red-700`}
    }
    svg {
      ${tw`w-4 h-4`}
    }
  }
`;
