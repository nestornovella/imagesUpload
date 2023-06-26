require('dotenv').config()

const {Sequelize} =require('sequelize')
const sequelize = new Sequelize(process.env.SEQUELIZE_URL, {
    logging:false,
    native:false,
    dialect:'postgres'
})


const Product = require('./models/product')
Product(sequelize)


console.log(sequelize.models)

module.exports ={
    ...sequelize.models,
    connection: sequelize
}