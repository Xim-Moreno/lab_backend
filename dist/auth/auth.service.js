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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const mongoose_2 = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const { password, ...userData } = createUserDto;
        try {
            const lastUser = await this.userModel.findOne().sort({ number: -1 }).exec();
            let newUserNumber;
            if (lastUser) {
                newUserNumber = (parseInt(lastUser.number) + 1).toString().padStart(6, '0');
            }
            else {
                newUserNumber = '000001';
            }
            const newUser = new this.userModel({
                password: bcryptjs.hashSync(password, 10),
                number: newUserNumber,
                ...userData
            });
            await newUser.save();
            const { password: _, ...user } = newUser.toJSON();
            return user;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.BadRequestException('The data is already linked to a user!');
            }
            throw new common_1.InternalServerErrorException('An error occurred.');
        }
    }
    async register(registerDto) {
        const user = await this.create(registerDto);
        return {
            user: user,
            token: this.getJwtToken({ id: user._id }),
        };
    }
    async login(loginDto) {
        const { number, password } = loginDto;
        const user = await this.userModel.findOne({ number });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado.');
        }
        if (!bcryptjs.compareSync(password, user.password)) {
            throw new common_1.UnauthorizedException('La contraseña es incorrecta.');
        }
        const { password: _, ...rest } = user.toJSON();
        return {
            user: rest,
            token: this.getJwtToken({ id: user.id }),
        };
    }
    findAll() {
        return this.userModel.find();
    }
    async findUserByNumber(number) {
        try {
            const user = await this.userModel.findOne({ number });
            if (!user) {
                throw new common_1.NotFoundException(`User with number ${number} not found`);
            }
            const { password, ...rest } = user.toJSON();
            return rest;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error finding user by number', error.message);
        }
    }
    async findUserById(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid ID format');
        }
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                throw new common_1.NotFoundException(`User with id ${id} not found`);
            }
            const { password, ...rest } = user.toJSON();
            return rest;
        }
        catch (error) {
            console.error('Error in findUserById:', error.message);
            throw new common_1.InternalServerErrorException('Error finding user');
        }
    }
    findOne(patient_id) {
        return `This action returns a #${patient_id} auth`;
    }
    update(id, updateAuthDto) {
        return `This action updates a #${id} auth`;
    }
    remove(id) {
        return `This action removes a #${id} auth`;
    }
    getJwtToken(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map