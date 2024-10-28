"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitaModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../auth/entities/user.entity");
const auth_module_1 = require("../auth/auth.module");
const cita_entity_1 = require("./entities/cita.entity");
const citas_controller_1 = require("./citas.controller");
const cita_service_1 = require("./cita.service");
let CitaModule = class CitaModule {
};
exports.CitaModule = CitaModule;
exports.CitaModule = CitaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: cita_entity_1.Cita.name, schema: cita_entity_1.CitaSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_entity_1.User.name, schema: user_entity_1.UserSchema }]),
            auth_module_1.AuthModule,
        ],
        controllers: [citas_controller_1.CitaController],
        providers: [cita_service_1.CitaService],
    })
], CitaModule);
//# sourceMappingURL=citas.module.js.map