const { Router } = require('express');

const OrderController = require('./controllers/OrderController');
const ProductController = require('./controllers/ProductController');
const AuthController = require('./controllers/AuthController');

const router = Router();

router.get('/orders', OrderController.index);
router.get('/orders/:query', OrderController.index);
router.get('/orders/calculator/:query', OrderController.calculator);
router.post('/orders/create', OrderController.create);
router.patch('/orders/:id/status', OrderController.update);
router.delete('/orders/delete/:id', OrderController.delete);
// product
router.get('/product', ProductController.index);
router.get('/product/:query', ProductController.index)
router.post('/product/create', ProductController.create);
router.put('/product/update/:id', ProductController.update);
router.delete('/product/delete/:id', ProductController.delete);
// authentication
router.post('/register', AuthController.register);
router.post('/authentication', AuthController.authentication);

module.exports = router;