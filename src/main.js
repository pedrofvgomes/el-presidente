const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const isDev = require('electron-is-dev');
import Realm from 'realm';
import schemas from './db/schemas';
import { spawn } from 'child_process';

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // startDjangoServer();

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    icon: process.platform === 'linux' || process.platform === 'darwin' ?
      path.join(__dirname, '../renderer/img/brunix-compact.png')
      :
      path.join(__dirname, '../renderer/img/brunix-compact.ico'),
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      const { requestHeaders } = details;
      UpsertKeyValue(requestHeaders, 'Access-Control-Allow-Origin', ['*']);
      callback({ requestHeaders });
    },
  );

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    const { responseHeaders } = details;
    UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Origin', ['*']);
    UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Headers', ['*']);
    callback({
      responseHeaders,
    });
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (!isDev) mainWindow.removeMenu();
  if (isDev) mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * DATABASE MANAGEMENT - REALM
 * 
 * Manages database operations using Realm, a lightweight and fast database solution.
 * Functions are defined in the main process, allowing access to the filesystem for reading and writing the database file.
 * Schemas are preloaded into the .realm file, which is then copied to the .webpack/renderer/db directory for accessibility by the renderer process, without requiring schema code exports.
 */

/**
 * The Realm database instance.
 * Represents the connection to the Realm database file.
 * @type {Realm}
 */
const realmDB = await Realm.open({
  path: path.join(__dirname, '../renderer/db/database.realm'),
  schema: schemas
}, (error) => {
  if (error) {
    console.error('Error opening database:', error.message);
  }
});

/**
 * Creates a new entry in the specified model with the provided fields and respective values.
 * @param {string} model - The name of the model (collection/table) in the Realm schema.
 * @param {object} fields - The fields and values to set for the new entry.
 * @returns {boolean} - Indicates whether the operation was successful (true) or not (false).
 */
function create(model, fields) {
  try {
    realmDB.write(() => {
      realmDB.create(model, fields);
    });
    return true; // Operation successful
  } catch (error) {
    console.error('Error creating entry:', error.message);
    return false; // Operation failed
  }
}
// Handle the 'create' request
ipcMain.handle('create', async (event, model, fields) => {
  return create(model, fields);
});

/**
 * Reads entries from the specified model based on the provided filters.
 * @param {string} model - The name of the model (collection/table) in the Realm schema.
 * @param {string} filters - The filters string used to filter the entries.
 * @returns {Array} - An array containing the queried entries, or an empty array if no entries match the filters.
 */
function read(model, filters) {
  try {
    const result = filters === '' ?
      realmDB.objects(model)
      : realmDB.objects(model).filtered(filters);

    // Convert Realm Results to an array of plain JavaScript objects
    const serializedResult = Array.from(result.map(obj => obj.toJSON()));

    return serializedResult;
  } catch (error) {
    console.error('Error reading entries:', error.message);
    return []; // Return an empty array in case of error
  }
}
// Handle the 'read' request
ipcMain.handle('read', async (event, model, filters) => {
  return read(model, filters);
});

/**
 * Updates the specified field of a Realm object with the provided value.
 * @param {Realm.Object} realmObject - The Realm object to update.
 * @param {string} field - The name of the field to update.
 * @param {*} value - The new value to set for the field.
 * @returns {boolean} - Indicates whether the operation was successful (true) or not (false).
 */
function update(realmObject, field, value) {
  console.log(realmDB.objects);
  try {
    realmDB.write(() => {
      // Update Realm.objects(realmObject) with the new value
      realmDB.create(realmObject, { [field]: value }, 'modified')
    });
    return true; // Operation successful
  } catch (error) {
    console.error('Error updating entry:', error.message);
    return false; // Operation failed
  }
}
// Handle the 'update' request
ipcMain.handle('update', async (event, realmObject, field, value) => {
  return update(realmObject, field, value);
});

/**
 * DJANGO
 */
const startDjangoServer = () => {
  const djangoBackend = spawn(`python\\brunixEnv\\Scripts\\python.exe`,
    ['python\\brunix\\manage.py', 'runserver', '--noreload']);
  djangoBackend.stdout.on('data', data => {
    console.log(`stdout:\n${data}`);
  });
  djangoBackend.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });
  djangoBackend.on('error', (error) => {
    console.log(`error: ${error.message}`);
  });
  djangoBackend.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  djangoBackend.on('message', (message) => {
    console.log(`message:\n${message}`);
  });
  return djangoBackend;
}


function UpsertKeyValue(obj, keyToChange, value) {
  const keyToChangeLower = keyToChange.toLowerCase();
  for (const key of Object.keys(obj)) {
    if (key.toLowerCase() === keyToChangeLower) {
      // Reassign old key
      obj[key] = value;
      // Done
      return;
    }
  }
  // Insert at end instead
  obj[keyToChange] = value;
}