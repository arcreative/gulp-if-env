# gulp-if-env [![Build Status](https://travis-ci.org/arcreative/gulp-if-env.svg?branch=master)](https://travis-ci.org/arcreative/gulp-if-env)

A gulp plugin to conditionally run tasks for one or more environments.

## Installation

Install the plugin using npm:

```sh
$ npm install gulp-if-env
```

## Basic usage

Require in `gulpfile.js`

```js
var ifEnv = require('gulp-if-env');
```

And use in your gulp tasks as such:

```js
gulp.task('my-task', function () {
    return gulp
        .src('src/index.html')
        .pipe(ifEnv('production', myProductionTask()))
        .pipe(gulp.dest('public/'));
});
```

Want to run a task on all but one environment? Use `not`:

```js
gulp.task('my-task', function () {
    return gulp
        .src('src/index.html')
        .pipe(ifEnv.not('development', nonDevelopmentTask()))
        .pipe(gulp.dest('public/'));
});
```

Or want to specify specific environments? No problem! Just use the `includes` function:

```js
gulp.task('my-task', function () {
    return gulp
        .src('src/index.html')
        .pipe(ifEnv.includes('production', 'staging', myProductionTask()))
        .pipe(gulp.dest('public/'));
});
```

## API

#### [main function]

There are three main interfaces to the main function:

```js
ifEnv(); // Returns current environment
ifEnv('production'); // Returns `true` for production, `false` for other
ifEnv('production', myGulpTask()); // Returns `myGulpTask` stream for production, otherwise no-op
```

#### `.not([environment], [gulpStream])`

There are two main interfaces to the `not()` function:

```js
ifEnv.not('production'); // Returns `true` in production, `false` for others
ifEnv.not('production', myGulpTask()); // Returns `myGulpTask` stream for production, otherwise no-op
```

#### `.includes([environment1], [environment2], [...more...], [gulpStream])`

There are two main interfaces to the `includes()` function:

```js
ifEnv.includes('production', 'staging'); // Returns `true` in production and staging, `false` for others
ifEnv.includes('production', 'staging', myGulpTask()); // Returns `myGulpTask` stream for production and staging, otherwise no-op
```

#### `.excludes([environment1], [environment2], [...more...], [gulpStream])`

There are two main interfaces to the `excludes()` function:

```js
ifEnv.excludes('production', 'staging'); // Returns `false` in production and staging, `true` for others
ifEnv.excludes('production', 'staging', myGulpTask()); // Returns no-op in production and staging, `myGulpTask` for others
```

#### `.set(environment)`

Sets a new environment if a change is required, or if your environment is specified somewhere other than `NODE_ENV` or as `env` CLI argument

```js
ifEnv.set('staging');
ifEnv('production'); // Returns false
ifEnv('staging'); // Returns true
```

#### `.reset()`

Resets to default (`NODE_ENV` or `env` CLI argument)

```js
ifEnv.set('staging');
ifEnv('staging'); // Returns true
ifEnv.reset();
ifEnv('staging'); // Returns false
ifEnv('development'); // Returns true
```

## Issues/contribution

Feel free to create an issue or pull request if you see something amiss.  Thanks!
