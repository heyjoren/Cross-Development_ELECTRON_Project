// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const os = require('os')
const fs = require('fs');

const createWindow = () => {
// Create the browser window.
const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
    }
})

// and load the index.html of the app.
mainWindow.loadFile('../www/index.html')
}

app.whenReady().then(() => {
createWindow()

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
})

app.on('window-all-closed', () => {
if (process.platform !== 'darwin') app.quit()
})

// ipcMain.on('AddFile', (event, arg) => {
//     console.log("arg: " + arg);
//     console.log("fileName: " + arg.fileName);
//     console.log("content: " + arg.content);

// ipcMain.on('AddFile', (event, {fileName, content}) => {
    // console.log("fileName: " + fileName);
    // console.log("content: " + content);

ipcMain.on('AddFile', (event, fileName, content) => {
    const todoListPath = path.join(app.getPath('documents'), 'ToDo_List');
    var filePath;
    
    try {
        if(fs.existsSync(todoListPath))
        {
            filePath = path.join(todoListPath, fileName + '.json');

        }
        else
        {
            fs.mkdirSync(todoListPath, { recursive: true });
            filePath = path.join(todoListPath, fileName + '.json');
        }

        console.log("filePath: " + filePath);
        fs.writeFileSync(filePath, JSON.stringify(content), 'utf-8');
        console.log(`File saved: ${filePath}`);
    }
    catch (error) {
        console.error('Error saving file:', error);
    }
})

ipcMain.handle('get-files', async () => {
    const todoListPath = path.join(app.getPath('documents'), 'ToDo_List');
    const files = fs.readdirSync(todoListPath);
    return files.filter(file => file.endsWith('.json'));
});

