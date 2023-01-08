'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "points"
 *
 **/

var info = {
    "revision": 2,
    "name": "delete-points-db",
    "created": "2023-01-07T20:01:26.609Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "dropTable",
    params: ["points"]
}];

var downMigrationCommands = [{
    fn: "createTable",
    params: [
        "points",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "primaryKey": true,
                "autoIncrement": true
            },
            "coordinates": {
                "type": Sequelize.GEOMETRY('POINT', 4326),
                "field": "coordinates",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}]

module.exports = {
    pos: 0,
    up: function (queryInterface, Sequelize) {
        var index = this.pos;
        return new Promise(function (resolve, reject) {
            function next() {
                if (index < migrationCommands.length) {
                    let command = migrationCommands[index];
                    console.log("[#" + index + "] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    down: function (queryInterface, Sequelize) {
        var index = this.pos;
        return new Promise(function (resolve, reject) {
            function next() {
                if (index < downMigrationCommands.length) {
                    let command = downMigrationCommands[index];
                    console.log("[#" + index + "] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
