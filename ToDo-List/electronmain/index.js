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
    minWidth: 400,
    minHeight: 500,
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

ipcMain.on('write-files', (event, fileName, content) => {
    const todoListPath = path.join(app.getPath('documents'), 'ToDo_List');
    var filePath;
    
    try {

        if (!fileName.endsWith('.json'))
        {
            fileName += '.json'
        }

        if(fs.existsSync(todoListPath))
        {
            filePath = path.join(todoListPath, fileName);
        }
        else
        {
            fs.mkdirSync(todoListPath, { recursive: true });
            filePath = path.join(todoListPath, fileName);
        }

        fs.writeFileSync(filePath, JSON.stringify(content), 'utf-8');
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

ipcMain.handle('read-file', async (event, fileName) => {   
    const todoListPath = path.join(app.getPath('documents'), 'ToDo_List');
    const filePath = path.join(todoListPath, fileName);
    
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const parsedContent = JSON.parse(fileContent);
        return {
            content: parsedContent,
            success: true
        };
    } catch (error) {
        return {
            content: null,
            success: false,
            error: error.message
        };
    }
});

