import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ConfigService } from '@nestjs/config/dist';
import * as argon from "argon2";
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwt: JwtService,private config: ConfigService){}

    async signin(authDto: AuthDto): Promise<{ access_token: string}>
    {
        
        const user = await this.prisma.user.findUnique({
            where: {
                email: authDto.email
            }
        });

        if(!user)
        {
            throw new ForbiddenException('Invalid credential');
        }

        const isPasswordMatches = await argon.verify(user.password, authDto.password);

        if(!isPasswordMatches)
        {
            throw new ForbiddenException('Invalid credential');
        }

        return this.signToken(user.id, user.email);

    }

    async signup(authDto: AuthDto): Promise<{ access_token: string}>
    {
        const hash = await argon.hash(authDto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: authDto.email,
                    password: hash
                }
            });

            return this.signToken(user.id, user.email);

        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError ){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Email Already In Use By Other');
                }
                throw error;
            }
            throw error;
        }
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string}>
    {
        const payload = { sub: userId, email };

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get("JWT_SECRET")
        })

        return {
            access_token: token
        }
    }

}
