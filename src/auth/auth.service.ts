import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, isValidObjectId } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';
import { RegisterUserDto, LoginDto, CreateUserDto, UpdateAuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
  
    try {
      // Buscar el último número de usuario en la base de datos
      const lastUser = await this.userModel.findOne().sort({ number: -1 }).exec();
      let newUserNumber;
  
      if (lastUser) {
        // Si ya hay usuarios, incrementa el último número
        newUserNumber = (parseInt(lastUser.number) + 1).toString().padStart(6, '0');
      } else {
        // Si no hay usuarios, empieza desde 000001
        newUserNumber = '000001';
      }
  
      // Encriptar contraseña
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        number: newUserNumber,
        ...userData
      });
  
      await newUser.save();
      const { password: _, ...user } = newUser.toJSON();
      return user;
  
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('The data is already linked to a user!');
      }
      throw new InternalServerErrorException('An error occurred.');
    }
  }
  

  async register(registerDto:RegisterUserDto):Promise<LoginResponse>{
    const user = await this.create(registerDto);//si el register dto fuera diferente al create dto hay que extraer los datos necesarios
    return{
      user:user,
      token:this.getJwtToken({id: user._id}),
    }
  }


  async login(loginDto:LoginDto):Promise<LoginResponse>{
    const {number, password} = loginDto;
    const user = await this.userModel.findOne({number});
    if (!user){
      throw new UnauthorizedException('Usuario no encontrado.');
    }
    if (!bcryptjs.compareSync(password, user.password)){
      throw new UnauthorizedException('La contraseña es incorrecta.');
    }
    const{password:_,...rest}=user.toJSON();

    return {
      user:rest,
      token:this.getJwtToken({id:user.id}),
    }
  }

  findAll(): Promise <User[]> {
    return this.userModel.find();
  }

  async findUserByNumber(number: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ number }); 
      if (!user) {
        throw new NotFoundException(`User with number ${number} not found`);
      }
      const { password, ...rest } = user.toJSON();
      return rest;
    } catch (error) {
      throw new InternalServerErrorException('Error finding user by number', error.message);
    }
  }

  async findUserById(id: string): Promise<Partial<User>> {
    // Validar si el ID es un ObjectId válido
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
  
    try {
      // Buscar usuario por ID
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
  
      // Excluir la contraseña antes de devolver el usuario
      const { password, ...rest } = user.toJSON();
      return rest; // Retorna el resto de las propiedades del usuario, excluyendo el password
  
    } catch (error) {
      // Loggear el error si es necesario
      console.error('Error in findUserById:', error.message);
  
      // Lanzar una excepción genérica
      throw new InternalServerErrorException('Error finding user');
    }
  }
  

  findOne(patient_id: string) {
    return `This action returns a #${patient_id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken(payload:JwtPayload){
    const token=this.jwtService.sign(payload);
    return token;
  }
}
