module.exports = {
    pos: 0,
    up: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;')
    },
    info: {
        "revision": 1,
        "name": "extension",
        "created": "2023-01-07T16:50:02.858Z",
        "comment": ""
    }
};
