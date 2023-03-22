module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tables',
        key: 'id',
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'comments',
    sequelize,
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: {
        name: "authorId", allowNull: false
      }
    })
    models.Table.hasMany(Comment, {
      foreignKey: {
        name: "tableId", allowNull: false
      }
    })
  }

  return Comment;
};
