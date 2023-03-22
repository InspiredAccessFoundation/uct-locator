'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "tables", deps: [users]
 * createTable "comments", deps: [tables, users]
 * createTable "pictures", deps: [tables, users]
 *
 **/

var info = {
    "revision": 1,
    "name": "init-db",
    "created": "2023-03-11T21:42:48.609Z",
    "comment": ""
};

var migrationCommands = [{
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
                    "allowNull": false
                },
                "city": {
                    "type": Sequelize.STRING,
                    "field": "city",
                    "allowNull": false
                },
                "state": {
                    "type": Sequelize.STRING,
                    "field": "state",
                    "allowNull": false
                },
                "zipcode": {
                    "type": Sequelize.INTEGER,
                    "field": "zipcode",
                    "max": 5,
                    "allowNull": false
                },
                "locationWithinBuilding": {
                    "type": Sequelize.STRING,
                    "field": "locationWithinBuilding",
                    "allowNull": true
                },
                "restroomType": {
                    "type": Sequelize.ENUM('men', 'women', 'family', 'other'),
                    "field": "restroomType",
                    "allowNull": false
                },
                "coordinateLocation": {
                    "type": Sequelize.GEOMETRY('POINT', 4326),
                    "field": "coordinateLocation",
                    "allowNull": false
                },
                "tableStyle": {
                    "type": Sequelize.ENUM('fixed-height', 'adjustable', 'child-size'),
                    "field": "tableStyle",
                    "allowNull": false
                },
                "tableNotes": {
                    "type": Sequelize.TEXT,
                    "field": "tableNotes",
                    "allowNull": true
                },
                "publicAccessibility": {
                    "type": Sequelize.ENUM('Patrons/Patients Only', 'Accessible to the Public'),
                    "field": "publicAccessibility",
                    "allowNull": false
                },
                "hours": {
                    "type": Sequelize.TEXT,
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
                    "type": Sequelize.TEXT,
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
                "tableId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "name": "tableId",
                    "field": "tableId",
                    "references": {
                        "model": "tables",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "authorId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "name": "authorId",
                    "field": "authorId",
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
                "tableId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "name": "tableId",
                    "field": "tableId",
                    "references": {
                        "model": "tables",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "uploaderId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "name": "uploaderId",
                    "field": "uploaderId",
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
