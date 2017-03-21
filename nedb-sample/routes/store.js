var router = require('express').Router();
var Datastore = require('nedb');
var db = new Datastore({ filename: 'data/store.db', autoload: true });

module.exports = require('./crud.api')(router, db);
