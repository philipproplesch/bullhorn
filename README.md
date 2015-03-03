# bullhorn
[![Build Status](https://travis-ci.org/philipproplesch/bullhorn.svg?branch=master)](https://travis-ci.org/philipproplesch/bullhorn)

## Getting started

### What's needed to build the project

- [Node.js](http://nodejs.org/)
- [Gulp](http://gulpjs.com/): `npm install -g gulp`
- [Bower](http://bower.io/): `npm install -g bower`

### How to start

- `cd` into the root directory and execute `npm install` & `gulp build`
- `gulp` starts a local watcher and observes changes you make to Sass and JavaScript files
- `gulp run` starts [node-webkit](https://github.com/rogerwang/node-webkit) and allows you to test the application


### Deployment

`gulp package` creates executable packages for Windows and OS X in the `/build` directory.

---

*Note to myself:* `npm-check-updates -u` updates all NPM packages and the `package.json`
