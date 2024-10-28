import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private authService;
    constructor(jwtService: JwtService, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
