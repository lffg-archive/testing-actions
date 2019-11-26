const { ensureValidMetaFiles } = require('./utils/ensurer');
const { ScriptError } = require('./utils/err');

async function main() {
  try {
    await ensureValidMetaFiles();
  } catch (error) {
    console.error(
      error instanceof ScriptError ? `\nScriptError: ${error.message}\n` : error
    );
    process.exit(1);
  }
}

main();
