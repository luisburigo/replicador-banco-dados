import {Response} from "express";

export const routeErrorHandler = (res: Response, message: string) =>
    res.status(400)
        .json({
            code: 400,
            message: message
        });
