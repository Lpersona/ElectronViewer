const {
  app,
  BrowserWindow,
  ipcMain,
  dialog
} = require('electron');
const isDevMode = require('electron-is-dev');
const path = require('path');

const {
  getServiceUrl,
  checkFileFromat,
  createService
} = require('./function');

// const Koa = require('koa');
// const route = require('koa-route');
// const serve = require('koa-static');

// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

// Port Number
// let port_number = 9999;

// const home = serve(path.join(__dirname) + '/app/');
// koa_app.use(home);

// koa_app.listen(port_number);

async function createWindow() {
  // Define our main window size
  mainWindow = new BrowserWindow({
    height: 920,
    width: 1600,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (isDevMode) {
    // Set our above template to the Menu Object if we are in development mode, dont want users having the devtools.
    // Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplateDev));
    // If we are developers we might as well open the devtools by default.
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(`http://localhost:4200/`);
  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.show();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Define any IPC or other custom functionality below here
ipcMain.on('getFiles', (event) => {

  const promise = dialog.showOpenDialog({
    title: '选择加载文件',
    properties: ['openFile']
  })

  promise.then(res => {
    if (res.filePaths && res.filePaths.length !== 0) {
      const file_path = res.filePaths[0];
      const {
        service_url,
        file_name
      } = getServiceUrl(file_path);
      const is_json = checkFileFromat(file_path, 'json');

      if (is_json) {
        const port_number = createService(service_url);
        const url = `http://localhost:${port_number}/${file_name}`;
        event.reply('getFileResponse', url, port_number);
      } else {
        // 这里弹出错误提示 ==> 非json文件
      }
    }
  })
})
