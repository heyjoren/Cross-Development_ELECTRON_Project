// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Menu } = require('electron')
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
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            sandbox: true,
            webSecurity: true,
            allowRunningInsecureContent: false,
            experimentalFeatures: false,
            remote: false,
            show: false,
        },
        title: "ToDoList",
        // icon: __dirname + "/resources/icon.png"
        icon: path.join(__dirname, "/resources/",
            os.platform() === "win32" ? "icon.ico" : 
            os.platform() === "darwin" ? 'icon.icns' :
            "icon.png"
        )
    })

    // Add permission handler
    mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
        // Define which permissions to allow/deny
        const allowedPermissions = ['media', 'geolocation'] 
        callback(allowedPermissions.includes(permission))
    })

    // Prevent navigation to external URLs
    mainWindow.webContents.on('will-navigate', (event, url) => {
        const allowedOrigin = 'file://'
        if (!url.startsWith(allowedOrigin)) {
            event.preventDefault()
            console.log('Navigation blocked:', url)
        }
    })

    // Prevent creating new windows
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        return { action: 'deny' }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('../www/index.html')

    //show only without white screen
    mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.show()
        mainWindow.focus()
    })
    
}

const isMac = process.platform ==='darwin';

const template = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    
    {
        label: 'File',
        submenu: [
            isMac ? {role: 'close'} : {role: 'quit'}
        ]
    },

    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' }
        ]
    },

]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

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

