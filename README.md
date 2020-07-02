# EasyViewer

使用 Angular&Electron 构建的 3dTiles 模型查看器

### Dev模式启动

1. `yarn && cd electron && yarn && cd ..` // 安装依赖
2. `electron` 内修改 main.js
```js
    // mainWindow.loadURL(earth_server);
    mainWindow.loadURL(`http://localhost:4200/`);
```
3. 运行 `electron .`
4. `cd ..`
5. `ng serve`
6. 启动成功即可

### 打包说明

1. yarn build
2. yarn ebuild

### 其他说明

需要全局安装 electron 和 electron-builder
