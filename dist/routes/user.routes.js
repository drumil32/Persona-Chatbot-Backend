"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// NOT USED FOR NOW
router.get('/users', user_controller_1.getAllUsers);
router.get('/users/:userName/history', validation_1.validateUserName, user_controller_1.getUserHistory);
router.delete('/users/:userName/history', validation_1.validateUserName, user_controller_1.clearUserHistory);
exports.default = router;
//# sourceMappingURL=user.routes.js.map