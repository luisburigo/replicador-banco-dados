import {Router} from "express";
import ProcessoController from "../controllers/ProcessoController";

const processoRoutes = Router();

processoRoutes.get('/', ProcessoController.getByDirecao);

export default processoRoutes;
