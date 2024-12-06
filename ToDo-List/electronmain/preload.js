// Preload
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
'api',
{
    writeFiles: (fileName, content) => {
        ipcRenderer.send('write-files', fileName, content);
    },
    
    getFiles: () => ipcRenderer.invoke('get-files'),

    readFile: (fileName) => ipcRenderer.invoke('read-file', fileName),
}
);

console.log('preload.js loaded');