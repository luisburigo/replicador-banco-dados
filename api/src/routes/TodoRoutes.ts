import {Request, Response, Router} from "express";
import {ITodoModel, ITodoSchema, TodoSchema} from "../models/TodoModel";
import {routeErrorHandler} from "../helpers/routeErrorHandler";

const todoRouter = Router();

todoRouter.get('/', async (req: Request, res: Response, next) => {
    const todos: ITodoSchema[] = await TodoSchema.find();
    return res.json(todos)
});

todoRouter.post('/', async (req: Request, res: Response, next) => {
    const body: ITodoModel = req.body;

    try {
        const todo: ITodoSchema = await TodoSchema.create(body);
        return res.json(todo)
    } catch (e) {
        return routeErrorHandler(res, "Ocorreu um erro ao salvar a Todo")
    }
});

todoRouter.put('/:id', async (req: Request, res: Response, next) => {
    const id = req.params.id;
    const body: ITodoModel = req.body;

    try {
        await TodoSchema.findByIdAndUpdate(id, body);
        return res.json(body)
    } catch (e) {
        return routeErrorHandler(res, "Ocorreu um erro ao atualizar a Todo")
    }
});

todoRouter.delete('/:id', async (req: Request, res: Response, next) => {
    const id = req.params.id;
    const todo: ITodoSchema = await TodoSchema.findByIdAndRemove(id);

    if (!todo) {
        return routeErrorHandler(res, 'Nenhuma Todo encontrado');
    }

    return res.json(todo)
});

export {todoRouter}

