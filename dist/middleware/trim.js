"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    const exceptions = ['password'];
    Object.keys(req.body).forEach(key => {
        if (!exceptions.includes(key) && typeof key === 'string') {
            key = key.trim();
        }
    });
    next();
};
//# sourceMappingURL=trim.js.map