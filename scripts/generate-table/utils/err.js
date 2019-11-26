class ScriptError extends Error {
  constructor(message) {
    super(message);

    this.message = message;
    this.name = 'ScriptError';
  }
}

async function to(promise, errorExtension) {
  try {
    const data = await Promise.resolve(
      typeof promise === 'function' ? promise() : promise
    );

    return [null, data];
  } catch (error) {
    if (errorExtension) {
      Object.assign(error, errorExtension);
    }

    return [error, undefined];
  }
}

async function handle(promise, message, ErrorInstance = ScriptError) {
  const [error, result] = await to(promise);

  if (error) {
    throw new ErrorInstance(message || error.message || 'Error');
  }

  return result;
}

module.exports = {
  ScriptError,
  to,
  handle
};
