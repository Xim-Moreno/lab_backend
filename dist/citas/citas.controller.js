"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitaController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/guards/auth.guard");
const cita_service_1 = require("./cita.service");
const create_cita_dto_1 = require("./dto/create-cita.dto");
let CitaController = class CitaController {
    constructor(citaService) {
        this.citaService = citaService;
    }
    create(createCitaDto) {
        return this.citaService.create(createCitaDto);
    }
    async findCitaById(id) {
        return this.citaService.findByPatientId(id);
    }
    async findCitas() {
        return this.citaService.findCitas();
    }
    async findMyCitas(req) {
        const patient_id = req['user'].number;
        return this.citaService.findByPatientId(patient_id);
    }
    async remove(id) {
        return this.citaService.remove(id);
    }
    async updateMuestra(id, muestra) {
        return this.citaService.updateMuestra(id, muestra);
    }
};
exports.CitaController = CitaController;
__decorate([
    (0, common_1.Post)('/create-cita'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cita_dto_1.CreateCitaDto]),
    __metadata("design:returntype", void 0)
], CitaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('patient-cita/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CitaController.prototype, "findCitaById", null);
__decorate([
    (0, common_1.Get)('/citas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CitaController.prototype, "findCitas", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/my_citas'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CitaController.prototype, "findMyCitas", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CitaController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/muestra'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('muestra')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], CitaController.prototype, "updateMuestra", null);
exports.CitaController = CitaController = __decorate([
    (0, common_1.Controller)('cita'),
    __metadata("design:paramtypes", [cita_service_1.CitaService])
], CitaController);
//# sourceMappingURL=citas.controller.js.map