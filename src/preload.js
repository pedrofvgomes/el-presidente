// Import necessary modules from Electron
const { contextBridge, ipcRenderer } = require('electron');

// Expose functions to the renderer process via context bridge
contextBridge.exposeInMainWorld('api', {
    /**
     * Creates a new entry in the specified model with the provided fields and respective values.
     * @param {string} model - The name of the model (collection/table) in the Realm schema.
     * @param {object} fields - The fields and values to set for the new entry.
     * @returns {Promise<boolean>} - A promise that resolves to true if the operation was successful, or false otherwise.
     */
    create: async (model, fields) => {
        try {
            return await ipcRenderer.invoke('create', model, fields);
        } catch (error) {
            console.error('Error invoking create:', error.message);
            return false; // Operation failed
        }
    },

    /**
     * Reads entries from the specified model based on the provided filters.
     * @param {string} model - The name of the model (collection/table) in the Realm schema.
     * @param {string} filters - The filters string used to filter the entries.
     * @returns {Promise<Array>} - A promise that resolves to an array containing the queried entries, or an empty array if no entries match the filters.
     */
    read: async (model, filters) => {
        try {
            return await ipcRenderer.invoke('read', model, filters);
        } catch (error) {
            console.error('Error invoking read:', error.message);
            return []; // Return an empty array in case of error
        }
    },

    /**
     * Updates the specified field of a Realm object with the provided value.
     * @param {Realm.Object} realmObject - The Realm object to update.
     * @param {string} field - The name of the field to update.
     * @param {*} value - The new value to set for the field.
     * @returns {Promise<boolean>} - A promise that resolves to true if the operation was successful, or false otherwise.
     */
    update: async (realmObject, field, value) => {
        try {
            return await ipcRenderer.invoke('update', realmObject, field, value);
        } catch (error) {
            console.error('Error invoking update:', error.message);
            return false; // Operation failed
        }
    }
});