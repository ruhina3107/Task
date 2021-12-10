const express = require('express')
const app = express()
const http = require('http').Server(app)
const cors = require('cors')
require('./Route')(app)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
http.listen(4000, function() {
    console.log('Server is running on', 4000)
 
})
/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */
