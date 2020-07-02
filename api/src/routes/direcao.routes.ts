import {Router} from "express";
import DirecaoController from "../controllers/DirecaoController";

const direcaoRoutes = Router();

direcaoRoutes.post('/', DirecaoController.create);
direcaoRoutes.get('/', DirecaoController.getAll);

export default direcaoRoutes;
