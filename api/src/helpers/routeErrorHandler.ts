import {Response} from "express";

export const routeErrorHandler = (res: Response, message: string) =>
    res.status(404)
        .json({
            code: 404,
            message: message
        });
