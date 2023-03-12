import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { PasswordDto, UserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @Get()
    findAll()
    {
        return this.userService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number)
    {
        return this.userService.findOne(id);
    }

    @Patch('/:id')
    update(@Param("id", ParseIntPipe) id: number , @Body() userDto: UserDto){
        return this.userService.update(id, userDto);
    }

    @Patch('/password/:id')
    changePassword(@Param('id', ParseIntPipe) id: number, passwordDto: PasswordDto)
    {
        return this.userService.updatePassword(id, passwordDto);
    }

    @Delete('/:id')
    remove(@Param('id', ParseIntPipe) id: number){
        return this.userService.remove(id);
    }

}
