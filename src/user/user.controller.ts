import { Controller, Delete, Get, Patch,Body,Param, Post, UseGuards } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { JwtGuard } from 'src/auth/guard';
import { FollowUserDto, PasswordDto, UserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @Get()
    @UseGuards(JwtGuard)
    findAll()
    {
        return this.userService.findAll();
    }

    @Get('/:id')
    @UseGuards(JwtGuard)
    findOne(@Param('id', ParseIntPipe) id: number)
    {
        return this.userService.findOne(id);
    }

    @Post('/follow')
    @UseGuards(JwtGuard)
    followUser(@Body() followUserDto: FollowUserDto){
        return this.userService.followUser(followUserDto);
    }

    @Post('/unfollow')
    @UseGuards(JwtGuard)
    unfollowUser(@Body() followUserDto: FollowUserDto){
        return this.userService.unFollowUser(followUserDto);
    }

    @Patch('/:id')
    @UseGuards(JwtGuard)
    update(@Param("id", ParseIntPipe) id: number , @Body() userDto: UserDto){
        return this.userService.update(id, userDto);
    }

    @Patch('/password/:id')
    @UseGuards(JwtGuard)
    changePassword(@Param('id', ParseIntPipe) id: number, @Body() passwordDto: PasswordDto)
    {       
        return this.userService.updatePassword(id, passwordDto);
    }

    @Delete('/:id')
    @UseGuards(JwtGuard)
    remove(@Param('id', ParseIntPipe) id: number){
        return this.userService.remove(id);
    }

}
