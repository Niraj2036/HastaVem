import express from 'express'
import {registerController} from '../controllers/authController.js'
import { loginController} from '../controllers/authController.js';
import { requireSignIn  } from '../middlewares/authMiddleware.js';

const Router=express.Router();

Router.post('/register',registerController);
Router.post('/login',loginController);
Router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });
export default Router;