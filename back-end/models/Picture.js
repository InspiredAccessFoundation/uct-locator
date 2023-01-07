module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define("Picture", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tableID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tables',
        key: 'id',
      },
    },
    uploaderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
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
    tableName: 'pictures',
    sequelize,
  });

  Picture.associate = (models) => {
    Picture.belongsTo(models.User, {
      foreignKey: {
        name: "uploaderID", allowNull: false
      }
    })
    Picture.belongsTo(models.Table, {
      foreignKey: {
        name: "tableID", allowNull: false
      }
    })
  }

  return Picture;
};