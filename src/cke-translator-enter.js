import { Essentials } from '@typo3/ckeditor5-bundle.js';

let required = Essentials.Essentials.requires;

export const ShiftEnter = required.find(el => el.name === "ShiftEnter")