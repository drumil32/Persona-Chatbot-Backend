"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const general_controller_1 = require("../controllers/general.controller");
const router = (0, express_1.Router)();
router.get('/', general_controller_1.welcome);
router.get('/api/health', general_controller_1.healthCheck);
router.get('/api/models', general_controller_1.getModels);
exports.default = router;
//# sourceMappingURL=general.routes.js.map