"use strict";
/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var url = require("url");
var path = require("path");
var logger_1 = require("./logger");
// retain a reference to the window, otherwise it gets gc-ed
var w = null;
function createWindow() {
    logger_1.log('Creating window.');
    w = new electron_1.BrowserWindow({ width: 800, height: 600, icon: 'assets/app_icon.png' });
    w.loadURL(url.format({
        pathname: path.join(path.dirname(__dirname), 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    w.on('close', function () {
        // allow window to be gc-ed
        w = null;
    });
    electron_1.ipcMain.on('app-focus', function () {
        logger_1.log('Main process is gaining focus');
        electron_1.app.focus();
    });
    return w;
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    logger_1.log('All windows closed');
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (w === null) {
        logger_1.log('Creating a new window');
        w = createWindow();
    }
});
//# sourceMappingURL=index.js.map