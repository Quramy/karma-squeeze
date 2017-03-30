# karma-squeeze

[![Greenkeeper badge](https://badges.greenkeeper.io/Quramy/karma-squeeze.svg)](https://greenkeeper.io/)

A Rule-Engine framework for [karma](http://karma-runner.github.io/1.0/index.html).

## Install

```sh
npm install karma-squeeze
```

## Usage

```javascript

  frameworks: ['mocha', 'squeeze'],
  
  // list of files / patterns to load in the browser
  files: [],
  
  // list of files to exclude
  exclude: [],
  
  squeeze: {

    // a list of files, such as `git diff --only-name` command output.
    listPath: "git_diff",

    // filtering rules for the above file list.
    // this rules will be merged `files` and `exclude` setting.
    rules: (builder) => {
      builder 
        .path('test/**/*.spec.js').includeSelf().and()
        .path('src/modules/core/**/*.js').include('test/**/*.spec.js').and()
        .path('src/modules/ui/**/*.js').include('test/**/*.spec.js').exclude('test/modules/core/**/*.spec.js').and()
        .other().include('test/**/*.spec.js')
      ;
    },
  },

```

## License
This software is released under the MIT License, see LICENSE.txt.


