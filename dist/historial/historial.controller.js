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
exports.HistorialController = void 0;
const common_1 = require("@nestjs/common");
const historial_service_1 = require("./historial.service");
const create_historial_dto_1 = require("./dto/create-historial.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
let HistorialController = class HistorialController {
    constructor(historialService) {
        this.historialService = historialService;
    }
    create(createHistorialDto) {
        return this.historialService.create(createHistorialDto);
    }
    async findMyHistorial(req) {
        const patient_id = req['user'].number;
        return this.historialService.findByPatientId(patient_id);
    }
    async findCitaById(id) {
        return this.historialService.findByPatientId(id);
    }
    async getAnalysisSummary() {
        return this.historialService.findAnalysisSummary();
    }
    async getAnalysisSummarybyId(lab_id) {
        return this.historialService.findAnalysisSummarybyId(lab_id);
    }
    async getAnalysisbyId(lab_id) {
        return this.historialService.findAnalysisbyId(lab_id);
    }
    async findHistorialByDoctorId(req) {
        const doctor_id = req['user'].number;
        return this.historialService.findByDoctorId(doctor_id);
    }
    async updateData(id, body) {
        return this.historialService.updateData(id, body.data, body.status);
    }
};
exports.HistorialController = HistorialController;
__decorate([
    (0, common_1.Post)('/create-historial'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_historial_dto_1.CreateHistorialDto]),
    __metadata("design:returntype", void 0)
], HistorialController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/my-historial'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HistorialController.prototype, "findMyHistorial", null);
__decorate([
    (0, common_1.Get)('patient-historial/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HistorialController.prototype, "findCitaById", null);
__decorate([
    (0, common_1.Get)('/analysis-summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HistorialController.prototype, "getAnalysisSummary", null);
__decorate([
    (0, common_1.Get)('/analysis-summary-lab/:lab_id'),
    __param(0, (0, common_1.Param)('lab_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HistorialController.prototype, "getAnalysisSummarybyId", null);
__decorate([
    (0, common_1.Get)('/analysis-lab/:lab_id'),
    __param(0, (0, common_1.Param)('lab_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HistorialController.prototype, "getAnalysisbyId", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('doctor-historial'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HistorialController.prototype, "findHistorialByDoctorId", null);
__decorate([
    (0, common_1.Patch)('/update-data/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HistorialController.prototype, "updateData", null);
exports.HistorialController = HistorialController = __decorate([
    (0, common_1.Controller)('historial'),
    __metadata("design:paramtypes", [historial_service_1.HistorialService])
], HistorialController);
//# sourceMappingURL=historial.controller.js.map