import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';
import { RegisterUserDto, LoginDto, CreateUserDto, UpdateAuthDto } from './dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<User>;
    register(registerDto: RegisterUserDto): Promise<LoginResponse>;
    login(loginDto: LoginDto): Promise<LoginResponse>;
    findAll(): Promise<User[]>;
    findUserByNumber(number: string): Promise<User>;
    findUserById(id: string): Promise<Partial<User>>;
    findOne(patient_id: string): string;
    update(id: number, updateAuthDto: UpdateAuthDto): string;
    remove(id: number): string;
    getJwtToken(payload: JwtPayload): string;
}
