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
exports.HistorialService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const historial_entity_1 = require("./entities/historial.entity");
const user_entity_1 = require("../auth/entities/user.entity");
let HistorialService = class HistorialService {
    constructor(historialModel, userModel) {
        this.historialModel = historialModel;
        this.userModel = userModel;
    }
    async create(createHistorialDto) {
        const patient = await this.userModel.findOne({ number: createHistorialDto.patient_id }).exec();
        console.log(patient);
        if (!patient) {
            throw new common_1.NotFoundException(`Paciente con ID ${createHistorialDto.patient_id} no encontrado.`);
        }
        const newHistorial = new this.historialModel(createHistorialDto);
        return await newHistorial.save();
    }
    async findByPatientId(patient_id) {
        const historiales = await this.historialModel.find({ patient_id: patient_id }).exec();
        return historiales;
    }
    async findByDoctorId(doctor_id) {
        try {
            return await this.historialModel.find({ doctor_id: doctor_id });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching historial by doctor_id', error.message);
        }
    }
    async findAnalysisSummary() {
        try {
            const historiales = await this.historialModel.find().exec();
            const analysisCounts = {
                'Hemograma completo': 0,
                'Perfil lipídico': 0,
                'Glucosa en sangre': 0,
                'Examen general de orina': 0,
                'Prueba de embarazo en sangre': 0
            };
            historiales.forEach(historial => {
                const analysis = historial.analysis;
                if (analysisCounts.hasOwnProperty(analysis)) {
                    analysisCounts[analysis] += 1;
                }
            });
            return analysisCounts;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching analysis summary', error.message);
        }
    }
    async findAnalysisSummarybyId(lab_id) {
        try {
            const historiales = await this.historialModel.find().exec();
            const analysisCounts = {
                'Hemograma completo': 0,
                'Perfil lipídico': 0,
                'Glucosa en sangre': 0,
                'Examen general de orina': 0,
                'Prueba de embarazo en sangre': 0
            };
            historiales.forEach(historial => {
                const analysis = historial.analysis;
                if (analysisCounts.hasOwnProperty(analysis)) {
                    if (historial.lab_id == lab_id) {
                        analysisCounts[analysis] += 1;
                    }
                }
            });
            return analysisCounts;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching analysis summary', error.message);
        }
    }
    async findAnalysisbyId(lab_id) {
        try {
            return await this.historialModel.find({ lab_id: lab_id });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching historial by lab_id', error.message);
        }
    }
    async updateData(id, data, status) {
        const historial = await this.historialModel.findById(id);
        if (!historial) {
            throw new common_1.NotFoundException(`Historial con ID ${id} no encontrado.`);
        }
        historial.data = data;
        historial.status = status;
        return await historial.save();
    }
};
exports.HistorialService = HistorialService;
exports.HistorialService = HistorialService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(historial_entity_1.Historial.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], HistorialService);
//# sourceMappingURL=historial.service.js.map