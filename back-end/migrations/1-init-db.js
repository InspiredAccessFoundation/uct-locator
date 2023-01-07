'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "points", deps: []
 * createTable "users", deps: []
 * createTable "tables", deps: [users]
 * createTable "comments", deps: [tables, users]
 * createTable "pictures", deps: [tables, users]
 *
 **/

var info = {
    "revision": 1,
    "name": "init-db",
    "created": "2023-01-07T16:50:02.858Z",
    "comment": ""
};

var migrationCommands = [{
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
},
{
    fn: "createTable",
    params: [
        "users",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "primaryKey": true,
                "autoIncrement": true
            },
            "name": {
                "type": Sequelize.STRING,
                "field": "name",
                "allowNull": false
            },
            "email": {
                "type": Sequelize.STRING,
                "field": "email",
                "allowNull": false
            },
            "username": {
                "type": Sequelize.STRING,
                "field": "username",
                "allowNull": false
            },
            "password": {
                "type": Sequelize.STRING,
                "field": "password",
                "allowNull": false
            },
            "createdDate": {
                "type": Sequelize.DATE,
                "field": "createdDate",
                "defaultValue": Sequelize.NOW
            },
            "role": {
                "type": Sequelize.ENUM('admin', 'user'),
                "field": "role",
                "defaultValue": "user"
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
},
{
    fn: "createTable",
    params: [
        "tables",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "primaryKey": true,
                "autoIncrement": true
            },
            "locationName": {
                "type": Sequelize.STRING,
                "field": "locationName",
                "allowNull": false
            },
            "userId": {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "name": "userId",
                "field": "userId",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "allowNull": false
            },
            "streetAddress": {
                "type": Sequelize.STRING,
                "field": "streetAddress",
                "allowNull": true
            },
            "city": {
                "type": Sequelize.STRING,
                "field": "city",
                "allowNull": true
            },
            "state": {
                "type": Sequelize.STRING,
                "field": "state",
                "allowNull": true
            },
            "zipcode": {
                "type": Sequelize.STRING,
                "field": "zipcode",
                "max": 5,
                "allowNull": true
            },
            "locationWithinBuilding": {
                "type": Sequelize.STRING,
                "field": "locationWithinBuilding",
                "allowNull": true
            },
            "restroomType": {
                "type": Sequelize.ENUM('men', 'women', 'family', 'other'),
                "field": "restroomType",
                "allowNull": true
            },
            "coordinateLocation": {
                "type": Sequelize.GEOMETRY('POINT', 4326),
                "field": "coordinateLocation",
                "allowNull": false
            },
            "tableStyle": {
                "type": Sequelize.ENUM('fixed-height', 'adjustable', 'portable'),
                "field": "tableStyle",
                "allowNull": true
            },
            "tableNotes": {
                "type": Sequelize.STRING,
                "field": "tableNotes",
                "allowNull": true
            },
            "publicAccessibility": {
                "type": Sequelize.ENUM('Patrons/Patients Only', 'Accessible to the Public'),
                "field": "publicAccessibility",
                "allowNull": true
            },
            "hours": {
                "type": Sequelize.STRING,
                "field": "hours",
                "allowNull": true
            },
            "contactPhone": {
                "type": Sequelize.STRING,
                "field": "contactPhone",
                "allowNull": true
            },
            "contactEmail": {
                "type": Sequelize.STRING,
                "field": "contactEmail",
                "allowNull": true
            },
            "additionalInfo": {
                "type": Sequelize.STRING,
                "field": "additionalInfo",
                "allowNull": true
            },
            "status": {
                "type": Sequelize.ENUM('submitted', 'approved', 'deleted', 'reported'),
                "field": "status",
                "allowNull": false,
                "defaultValue": "submitted"
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
},
{
    fn: "createTable",
    params: [
        "comments",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "primaryKey": true,
                "autoIncrement": true
            },
            "tableID": {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "name": "tableID",
                "field": "tableID",
                "references": {
                    "model": "tables",
                    "key": "id"
                },
                "allowNull": false
            },
            "authorID": {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "name": "authorID",
                "field": "authorID",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "allowNull": false
            },
            "body": {
                "type": Sequelize.STRING,
                "field": "body",
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
},
{
    fn: "createTable",
    params: [
        "pictures",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "primaryKey": true,
                "autoIncrement": true
            },
            "tableID": {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "name": "tableID",
                "field": "tableID",
                "references": {
                    "model": "tables",
                    "key": "id"
                },
                "allowNull": false
            },
            "uploaderID": {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "name": "uploaderID",
                "field": "uploaderID",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "allowNull": false
            },
            "name": {
                "type": Sequelize.STRING,
                "field": "name",
                "allowNull": true
            },
            "url": {
                "type": Sequelize.STRING,
                "field": "url",
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
}
];

module.exports = {
    pos: 1,
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
