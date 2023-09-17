import express from "express"

const error = (
    err: Error,
    _req: express.Request,
    res: express.Response, 
    _next: express.NextFunction
    ) => {

    res.status(res.statusCode || 500)
    res.json({
        message: err.message,
        stack: err.stack
    })
}

export default error;
