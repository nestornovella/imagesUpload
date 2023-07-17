require('dotenv').config()

const {Sequelize} =require('sequelize')
const sequelize = new Sequelize(process.env.SEQUELIZE_URL, {
    logging:false,
    native:false,
    dialect:'postgres',
    dialectOptions: {
              ssl: {
                require: true,
                rejectUnauthorized: false, // Solo si tienes problemas con los certificados SSL
              },
            }
})

// const sequelize = new Sequelize('pruebasDb', 'usuario', 'Ciro1990', {
//     host: 'pruebasdb.cbe9cr0k1a4u.us-west-2.rds.amazonaws.com',
//     port: 5432,
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false, // Solo si tienes problemas con los certificados SSL
//       },
//     },
//   });
const Product = require('./models/product')
Product(sequelize)


console.log(sequelize.models)

module.exports ={
    ...sequelize.models,
    connection: sequelize
}