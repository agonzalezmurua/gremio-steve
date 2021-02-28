//
// This module exports names of those events that can be
// triggered using the Electrons IPC events
//

export namespace Main {
  /**
   * Main thread events that cause an effect or actions
   * on the main process
   */
  export enum Events {
    /** Minimizes the main window */
    minimize_window = 'minimize_window',
    /** Maximizes the main window */
    maximize_window = 'maximize_window',
    /** Closes the main window  */
    close_window = 'close_main_window',
    /** Open authentication window */
    open_auth = 'open_auth',
  }
}

export namespace Renderer {
  /**
   * Main thread events that cause an effect or actions
   * on the renderer process
   */
  export enum Events {
    /** Fallback event when the handler cannot determine the intention, do not use */
    unknown = 'unknown',
    authenticate = 'authenticate',
  }
  export namespace Payloads {
    export type Authentication = {
      /** Authentication string from service */
      code: string;
    };
  }
}
