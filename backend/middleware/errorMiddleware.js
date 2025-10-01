
export const notFound = (req, res, next) => {
    res.status(404).json({ok: false, message: `Route not found ${req.originalUrl}`});
};

export const errorHandler = (error, req, res, next) => {
    const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(status).json({
        ok: false,
        message: error?.message || "Server error",
    });
};