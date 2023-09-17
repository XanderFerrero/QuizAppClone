const error = (err, _req, res, _next) => {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
};
export default error;
//# sourceMappingURL=error.js.map