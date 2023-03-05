'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "tableStyle" on table "tables"
 *
 **/

var info = {
    "revision": 5,
    "name": "table-style-updates",
    "created": "2023-03-05T13:47:20.765Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "tables",
        "tableStyle",
        {
            "type": Sequelize.ENUM('fixed-height', 'adjustable', 'child-size'),
            "field": "tableStyle",
            "allowNull": false
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
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
