const Router = require('express')
const router = new Router()
const goodsController = require('../controllers/goods.controller')

router.post('/goods', goodsController.createGoods )
router.get('/goods', goodsController.getGoods)
router.get('/goods/:id', goodsController.getOneGood)
router.put('/goods', goodsController.updateGood)
router.delete('/goods/:id', goodsController.deleteGood)


module.exports = router