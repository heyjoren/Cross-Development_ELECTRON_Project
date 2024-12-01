// Preload
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
'api',
{
    AddFile: (fileName, content) => {
        ipcRenderer.send('AddFile', fileName, content);
    },
    
    getFiles: () => ipcRenderer.invoke('get-files'),

    readFile: (fileName) => ipcRenderer.invoke('read-file', fileName),
}
);

console.log('preload.js loaded');