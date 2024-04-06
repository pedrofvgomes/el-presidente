import {stores} from "../stores";

export function translate(key) {
    let languageFile = require(`../translations/${stores.userStore.language}.js`);
    // if the value is not found in the language file, return the key itself
    return languageFile.default[key] || key;
}