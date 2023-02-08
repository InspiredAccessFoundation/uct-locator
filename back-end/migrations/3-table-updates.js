'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "streetAddress" on table "tables"
 * changeColumn "city" on table "tables"
 * changeColumn "state" on table "tables"
 * changeColumn "zipcode" on table "tables"
 * changeColumn "zipcode" on table "tables"
 * changeColumn "restroomType" on table "tables"
 * changeColumn "tableStyle" on table "tables"
 * changeColumn "tableNotes" on table "tables"
 * changeColumn "publicAccessibility" on table "tables"
 * changeColumn "hours" on table "tables"
 * changeColumn "additionalInfo" on table "tables"
 *
 **/

var info = {
    "revision": 3,
    "name": "table-updates",
    "created": "2023-01-25T13:42:02.665Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "tables",
        "streetAddress",
        {
            "type": Sequelize.STRING,
            "field": "streetAddress",
            "allowNull": false
        }
    ]
},
{
    fn: "changeColumn",
    params: [
        "tables",
        "city",
        {
            "type": Sequelize.STRING,
            "field": "city",
            "allowNull": false
        }
    ]
},
{
    fn: "changeColumn",
    params: [
        "tables",
        "state",
        {
            "type": Sequelize.STRING,
            "field": "state",
            "allowNull": false
        }
    ]
},
{
    fn: "changeColumn",
    params: [
        "tables",
        "zipcode",
        {
            "type": Sequelize.INTEGER,
            "field": "zipcode",
            "max": 5,
            "allowNull": false
        }
    ]
},
{
    fn: "changeColumn",
    params: [
        "tables",
        "zipcode",
        {
            "type": Sequelize.INTEGER,
            "field": "zipcode",
            "max": 5,
            "allowNull": false
        }
    ]
},
{
    fn: "changeColumn",
    params: [
        "tables",
        "restroomType",
        {
            "type": Sequelize.ENUM('men', 'women', 'family', 'other'),
            "field": "restroomType",
            "allowNull": false
        }
    ]
},
{
    fn: "changeColumn",
    params: [
        "tables",
        "tableStyle",
        {
            "type": Sequelize.ENUM('fixed-height', 'adjustable', 'portable'),
            "field": "tableStyle",
            "allowNull": false
        }
    ]
},
{
    fn: "changeColumn",
    params: [
        "tables",
        "tableNotes",
        {
            "type": Sequelize.TEXT,
            "field": "tableNotes",
            "allowNull": true
        }
    ]
},
{
    fn: "changeColumn",
    params: [
        "tables",
        "publicAccessibility",
        {
            "type": Sequelize.ENUM('Patrons/Patients Only', 'Accessible to the Public'),
            "field": "publicAccessibility",
            "allowNull": false
        }
    ]
},
{
    fn: "changeColumn",
    params: [
        "tables",
        "hours",
        {
            "type": Sequelize.TEXT,
            "field": "hours",
            "allowNull": true
        }
    ]
},
{
    fn: "changeColumn",
    params: [
        "tables",
        "additionalInfo",
        {
            "type": Sequelize.TEXT,
            "field": "additionalInfo",
            "allowNull": true
        }
    ]
}
];

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
    info: info
};

