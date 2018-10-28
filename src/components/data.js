import { Character } from './Character';

let freddy = new Character(
  'Freddie and Kevin',
  Math.floor(Math.random() * 200) + 100,
  Math.floor(Math.random() * 8) + 3,
  Math.floor(Math.random() * 20) + 4,
  'https://uploads.codesandbox.io/uploads/user/c87037ce-2b65-4af3-aa6f-16ff5ad41c66/xUZu-Freddie%20and%20Kevin.svg',
  '236, 1, 134'
);

let bill = new Character(
  'Bill the Cop',
  Math.floor(Math.random() * 200) + 100,
  Math.floor(Math.random() * 8) + 3,
  Math.floor(Math.random() * 20) + 4,
  'https://uploads.codesandbox.io/uploads/user/c87037ce-2b65-4af3-aa6f-16ff5ad41c66/TObF-Bill%20the%20Cop.svg',
  '60, 156, 194'
);

let wendy = new Character(
  'Wendy',
  Math.floor(Math.random() * 200) + 100,
  Math.floor(Math.random() * 8) + 3,
  Math.floor(Math.random() * 20) + 4,
  'https://uploads.codesandbox.io/uploads/user/c87037ce-2b65-4af3-aa6f-16ff5ad41c66/3hxa-Wendy.svg',
  '255, 236, 85'
);

let bronson = new Character(
  'Bronson',
  Math.floor(Math.random() * 200) + 100,
  Math.floor(Math.random() * 8) + 3,
  Math.floor(Math.random() * 20) + 4,
  'https://uploads.codesandbox.io/uploads/user/c87037ce-2b65-4af3-aa6f-16ff5ad41c66/dwWA-Bronson.svg',
  '44, 193, 156'
);

let characters = [
  freddy,
  bill,
  wendy,
  bronson
];

export default characters;
