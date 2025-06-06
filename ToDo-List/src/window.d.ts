interface Window {
    api: {
        /** Sends a signal to the main process */
        ipcSendToMain: () => void;
        /** Only sends a fixed string to the console */
        doThing: () => void;
        /** Set the listener for the reply from the main process */
        ipcReceiveReplyFromMain: (channel: string, listener: (event: any, ...arg: any) => void) => void;
        /** Get the Electron version */
        getElectronVersion: () => string;


        writeFiles: (fileName: string, content: any) => void;

        getFiles: () => Promise<string[]>;

        readFile: (fileName: string) => Promise<{
            content: any;
            success: boolean;
            error?: string;
        }>;
    };
    }
    