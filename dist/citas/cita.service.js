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
exports.CitaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../auth/entities/user.entity");
const cita_entity_1 = require("./entities/cita.entity");
let CitaService = class CitaService {
    constructor(citaModel, userModel) {
        this.citaModel = citaModel;
        this.userModel = userModel;
    }
    async create(createCitaDto) {
        const patient = await this.userModel.findOne({ number: createCitaDto.patient_id }).exec();
        if (!patient) {
            throw new common_1.NotFoundException(`Paciente con ID ${createCitaDto.patient_id} no encontrado.`);
        }
        const newCita = new this.citaModel(createCitaDto);
        return await newCita.save();
    }
    async findByPatientId(patient_id) {
        const citas = await this.citaModel.find({ patient_id: patient_id }).exec();
        return citas;
    }
    async findCitas() {
        try {
            const citas = await this.citaModel.find().exec();
            return citas;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching analysis summary', error.message);
        }
    }
    async remove(id) {
        const result = await this.citaModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException(`Cita con id ${id} no encontrada`);
        }
        return { message: 'Cita eliminada exitosamente' };
    }
    async updateMuestra(id, muestra) {
        const cita = await this.citaModel.findById(id);
        if (!cita) {
            throw new common_1.NotFoundException(`Cita con ID ${id} no encontrada.`);
        }
        cita.muestra = muestra;
        return await cita.save();
    }
};
exports.CitaService = CitaService;
exports.CitaService = CitaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cita_entity_1.Cita.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CitaService);
//# sourceMappingURL=cita.service.js.map