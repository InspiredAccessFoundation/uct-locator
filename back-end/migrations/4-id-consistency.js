'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "authorId" to table "comments"
 * addColumn "tableId" to table "comments"
 * addColumn "uploaderId" to table "pictures"
 * addColumn "tableId" to table "pictures"
 *
 **/

var info = {
    "revision": 4,
    "name": "id-consistency",
    "created": "2023-01-25T13:44:31.776Z",
    "comment": ""
};

module.exports = {
    pos: 0,
    up: function (queryInterface, Sequelize) {
        queryInterface.renameColumn('pictures', 'tableID', 'tableId')
        queryInterface.renameColumn('pictures', 'uploaderID', 'uploaderId')
        queryInterface.renameColumn('comments', 'tableID', 'tableId')
        queryInterface.renameColumn('comments', 'authorID', 'authorId')
    },
    info: info
};
