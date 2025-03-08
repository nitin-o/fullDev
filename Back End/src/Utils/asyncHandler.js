export const asyncHandler1 = (functionR) => {
    return (req, res, next) => {
        Promise.resolve(functionR(req, res, next))
            .catch((err) => next(err));
    };
};



export const asyncHandler2 = function (handler) {
    return async function (req, res, next) {
        try {
            await handler(req, res, next);
        } catch (error) {
            console.error(error);
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
        }
    };
};

