#!/usr/bin/env node

'use strict';

const Skyhook = require('./skyhook');

const skyhook = new Skyhook();

skyhook.boot(function(error) {
  if (error) {
    process.exit(1);
  }
});
