const { Router } = require('express')
const { Product } = require('../db')
const { where } = require('sequelize')

const router = Router()
//  { 
//   id
//   name
//   price
//   stock
//   categories}

router.get('/', async (req, res)=>{
try {
    const response = await Product.findAll()
    res.json(response)
} catch (error) {
    res.json({status: 'error', messaje: error.message})
}
})

router.post('/', async (req, res)=>{
    const {name, image} = req.body

try {
    if(!name || !image){throw new Error('faltan parametros')}
    const  productCreate = await Product.create(req.body)
    res.json({status: 'created', response: productCreate})
} catch (error) {
    res.json({status: 'error', messaje: error.message})
}
})


router.put('/', async (req, res) => {
    const { id } = req.body

    try {
        if(!id){throw new Error('faltan parametros')}
        const updated =await Product.update(req.body, { where: { id: id } })
        console.log(updated)
        if(updated[0] === 1) res.json({status:'updated', response: updated})
        else{res.json({status:'not updated'})}
    } catch (error) {
        res.json({status: 'error', messaje: error.message})
    }
})



router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        if(!id){throw new Error('faltan parametros')}

        const deleted = await Product.destroy({where: {id:id}})
        res.json({status:'deleted', message: 'the product wad deleted'})
    } catch (error) {
        res.json({status: 'error', messaje: error.message})
    }
})



module.exports = router