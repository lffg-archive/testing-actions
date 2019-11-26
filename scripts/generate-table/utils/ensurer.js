const { promises: fs } = require('fs');
const { meta } = require('../constants');
const { ScriptError, handle } = require('./err');

const META_FILES = ['parsed.json'];

async function checkMetaFile(fileName) {
  const filePath = meta(fileName);

  const contents = await handle(
    fs.readFile(filePath, 'utf8'),
    `Invalid file. The file "${fileName}" couldn't be read.`
  );

  const json = await handle(
    () => JSON.parse(contents),
    `Invalid JSON. The file "${fileName}" couldn't be parsed.`
  );

  if (!Array.isArray(json)) {
    throw new ScriptError(
      `Invalid JSON. The file "${fileName}" must contain an array.`
    );
  }

  return true;
}

async function ensureValidMetaFiles() {
  const promises = META_FILES.map(checkMetaFile);

  await Promise.all(promises);
  return true;
}

module.exports = {
  ensureValidMetaFiles
};
