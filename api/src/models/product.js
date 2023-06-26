const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelizeInstance) => {
  sequelizeInstance.define('Product', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'indefinido',
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
};