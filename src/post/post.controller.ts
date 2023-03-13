import { Controller, Delete, Get, Patch, Post, Param, ParseIntPipe, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { LikeDto, PostDto, UpdatePostDto } from './dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {

    constructor(private postService: PostService){}

    @Get()
    @UseGuards(JwtGuard)
    getPosts(){
        return this.postService.getAll();
    }

    @Get('/:id')
    @UseGuards(JwtGuard)
    getPost(@Param('id', ParseIntPipe) id: number ){
        return this.postService.getOne(id);
    }

    @Post('/like')
    @UseGuards(JwtGuard)
    likePost(@Body() likeDto: LikeDto){
        return this.postService.like(likeDto);
    }

    @Post()
    @UseGuards(JwtGuard)
    newPost(@Body() postDto: PostDto){
        return this.postService.create(postDto);
    }

    @Patch('/:id')
    @UseGuards(JwtGuard)
    updatePost(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdatePostDto){
        return this.postService.update(id,updateDto);
    }

    @Delete('/:id')
    @UseGuards(JwtGuard)
    deletePost(@Param('id', ParseIntPipe) id: number){
        return this.postService.delete(id);
    }

}
