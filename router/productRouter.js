const { Router } = require('express')
const router = Router()
const {authenticateJWT} = require('../controller/admin.js')
const {getAllProducts,postProducts, updateProducts, DeleteProduct} = require('../controller/products')


router.post('/admin/products',authenticateJWT,postProducts)
router.get('/admin/products',authenticateJWT,getAllProducts)
router.put('/admin/products',authenticateJWT,updateProducts)
router.delete('/admin/products/:id',authenticateJWT,DeleteProduct)


module.exports = router