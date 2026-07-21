import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateAdmin(email: string, pass: string): Promise<any>;
    login(admin: any): Promise<{
        access_token: string;
    }>;
}
