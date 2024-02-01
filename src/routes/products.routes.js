import {Router} from 'express';
import * as productsCtrl from '../controllers/product.controller'
import {authJWT} from '../middlewares/index';

const router = Router();

router.get('/', productsCtrl.getProducts);
router.get('/:ProductId',productsCtrl.getProductById);

router.post('/',[authJWT.verifyToken,  authJWT.isAdmin],productsCtrl.createProduct);

router.put('/:ProductId',authJWT.verifyToken,productsCtrl.updateProductById);

router.delete('/:ProductId',authJWT.verifyToken,productsCtrl.deleteProductById);




export default router;