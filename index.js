var gif = require("gulp-if");
var argv = require("yargs").argv;

function _transformArguments() {
  var args = Array.prototype.slice.call(arguments),
      environments,
      gulpStream;

  if (typeof args.slice(-1)[0] === 'object') {
    gulpStream = args.slice(-1)[0];
    environments = args.slice(0, arguments.length-1);
  } else {
    environments = args;
  }

  return [environments, gulpStream];
}

// Set current env from NODE_ENV, env CLI arg, and fall back to development
var currentEnv;

// Return name of current environment, or stream task if name matches current environment
function env(name, gulpStream) {
  // Return current environment
  if (!name) {
    return currentEnv;
  }

  // Return gulp stream if gulp stream provided
  var isCurrent = name === currentEnv;
  if (gulpStream) {
    return gif(isCurrent, gulpStream);
  }

  // Else, return whether env is current or not
  return isCurrent;
}

// Set a new environment
env.set = function(name) {
  currentEnv = name;
};

// Reset to parsed environment
env.reset = function() {
  currentEnv = process.env.NODE_ENV || argv.env || "development";
};

// Opposite of `env`
env.not = function(name, gulpStream) {
  // Return gulp stream if gulp stream provided
  var isNotCurrent = name !== currentEnv;
  if (gulpStream) {
    return gif(isNotCurrent, gulpStream);
  }

  // Else, return whether env is current or not
  return isNotCurrent;
};

// Same as `env`, but accepts multiple environments
env.includes = function () {
  var args = _transformArguments.apply(null, arguments),
      environments = args[0],
      gulpStream = args[1];

  var includesCurrent = environments.indexOf(currentEnv) !== -1;
  if (gulpStream) {
    return gif(includesCurrent, gulpStream);
  }
  return includesCurrent;
};

// Opposite of `env`, but accepts multiple environments
env.excludes = function () {
  var args = _transformArguments.apply(null, arguments),
      environments = args[0],
      gulpStream = args[1];

  var includesCurrent = environments.indexOf(currentEnv) !== -1;
  if (gulpStream) {
    return gif(!includesCurrent, gulpStream);
  }
  return !includesCurrent;
};

// Set initial environment
env.reset();

module.exports = env;
