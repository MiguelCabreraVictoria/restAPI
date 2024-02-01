import {Router} from 'express';
import * as authCtrl from '../controllers/auth.controller';
const router = Router();


router.post('/log-in', authCtrl.Login)
router.post('/sign-up', authCtrl.signUp);

export default router;