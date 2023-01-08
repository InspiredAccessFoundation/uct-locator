module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define("Table", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    locationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: true,
      max: 5,
    },
    locationWithinBuilding: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    restroomType: {
      type: DataTypes.ENUM('men', 'women', 'family', 'other'),
      allowNull: true,
    },
    coordinateLocation: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: false,
    },
    tableStyle: {
      type: DataTypes.ENUM('fixed-height', 'adjustable', 'portable'),
      allowNull: true,
    },
    tableNotes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publicAccessibility: {
      type: DataTypes.ENUM('Patrons/Patients Only', 'Accessible to the Public'),
      allowNull: true,
    },
    hours: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    additionalInfo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('submitted', 'approved', 'deleted', 'reported'),
      defaultValue: 'submitted',
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
    tableName: 'tables',
    sequelize,
  });

  Table.associate = (models) => {
    Table.belongsTo(models.User, {
      foreignKey: {
        name: "userId", allowNull: false
      }
    })
  }

  return Table;
};