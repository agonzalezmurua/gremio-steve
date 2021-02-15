import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Document from 'Document';
import { useAsync } from 'react-use';
import { ipcRenderer } from 'electron';

type Props = {
  windowName?: string;
};

const ExternalWindow: React.FC<Props> = (props) => {
  ipcRenderer.invoke('newWindow').then((w) => console.log(w));
  return null;
  // const externalWindow = useRef(
  //   new window.electronRemote.BrowserWindow({
  //     center: true,
  //     height: 400,
  //     width: 300,
  //   })
  // );
  // const containerEl = useRef(document.createElement('div'));

  // useEffect(() => {
  //   if (externalWindow.current) {
  //     console.log(externalWindow);
  //     // externalWindow.current.document.body.appendChild(containerEl.current);
  //   }

  //   return () => {
  //     if (externalWindow.current) {
  //       externalWindow.current.close();
  //     }
  //   };
  // }, [externalWindow.current]);

  // if (externalWindow.current === null) {
  //   return null;
  // }

  // return ReactDOM.createPortal(
  //   <Document>{props.children}</Document>,
  //   containerEl.current
  // );
};

ExternalWindow.defaultProps = {
  windowName: '',
};

export default ExternalWindow;
