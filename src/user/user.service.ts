import { Injectable } from '@nestjs/common';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { User } from '@prisma/client';
import * as argon from "argon2";
import { PrismaService } from 'src/prisma/prisma.service';
import { FollowUserDto, PasswordDto, UserDto } from './dto';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    private async findById(id: number): Promise<User>
    {
        const user = await this.prisma.user.findUnique({ 
            where: { id },
            include: { followers: true, followings: true } 
        });
        
        
        if(!user){
            throw new NotFoundException("Unable to find User By This ID");
        }
        
        return user;
    }

    private async verifyPassword(hash: string,password: string): Promise<Boolean>
    {
        const isPasswordMatches = await argon.verify(hash,password);
        
        if(!isPasswordMatches){
            throw new ForbiddenException('Invalid Credential');
        }
        
        return isPasswordMatches;
    }

    async findAll(): Promise<User[]>
    {
        const users = await this.prisma.user.findMany();
        return users;
    }

    async findOne(id: number): Promise<User>
    {
        return this.findById(id);
    }

    async followUser(followUserDto: FollowUserDto){
        const follow = await this.prisma.user.update({
            where: { id: followUserDto.userToFollow },
            data: {
                followers: {
                    connect: { id: followUserDto.currentUser }
                }
            }
        })
        return follow;
    }

    async unFollowUser(followUserDto: FollowUserDto){
        const unfollow = await this.prisma.user.update({
            where: { id: followUserDto.userToFollow },
            data: {
                followers: {
                    disconnect: { id: followUserDto.currentUser }
                }
            }
        })
        return unfollow;
    }

    async update(id: number, userDto: UserDto): Promise<User>
    {
        
        const user = await this.findById(id);

        await this.verifyPassword(user.password, userDto.password);

        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                email: userDto.email,
                name: userDto.name,
                bio: userDto.bio
            }
        });

        return updatedUser;
    }

    async updatePassword(id: number, passwordDto: PasswordDto): Promise<User>
    {
        const user = await this.findById(id);

        const isPasswordMatches = await argon.verify(user.password, passwordDto.password);

        if(!isPasswordMatches)
        {
            throw new ForbiddenException("Invalid Credentials");
        }

        const newPasswordHash = await argon.hash(passwordDto.newPassword);

        const updatedUser = await this.prisma.user.update({
            where: {id},
            data: {
                password: newPasswordHash
            }
        });

        return updatedUser;
    }

    async remove(id: number): Promise<User>
    {
        return this.prisma.user.delete({where : {id}});
    }

}
