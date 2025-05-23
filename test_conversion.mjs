import fs from 'fs';
import { buildElementorJson } from './transformers/tree.js'; // Assuming execution from /app

const oxygenJsonString = fs.readFileSync('example.json', 'utf-8');
const oxygenJsonObject = JSON.parse(oxygenJsonString);

const elementorJsonArray = buildElementorJson(oxygenJsonObject);
const formattedElementorJson = JSON.stringify(elementorJsonArray, null, 2);

console.log(formattedElementorJson);
