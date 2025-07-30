export const errorHandler = (error, req, res, next) => {
    req.logger?.error(`${error.name}: ${error.message}\n${error.stack}`);
    res.status(error.statusCode || 500).json({
        ok: false,
        mensaje: 'Error inesperado en el servidor',
    });
};
