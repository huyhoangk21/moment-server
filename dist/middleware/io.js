"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, _, next) => {
    const io = req.app.get('socketio');
    io.emit('New Change');
    next();
};
//# sourceMappingURL=io.js.map