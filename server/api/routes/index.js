'use strict';

let Main = require('../controllers/main.js');

module.exports = [
    { method: 'GET', path: '/api/v1/getdata/{id}', config: Main.getData }
]
