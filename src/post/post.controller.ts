import { Controller, Delete, Get, Patch, Post, Param, ParseIntPipe, Body } from '@nestjs/common';
import { PostDto, UpdatePostDto } from './dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {

    constructor(private postService: PostService){}

    @Get()
    getPosts(){
        return this.postService.getAll();
    }

    @Get('/:id')
    getPost(@Param('id', ParseIntPipe) id: number ){
        return this.postService.getOne(id);
    }

    @Post()
    newPost(@Body() postDto: PostDto){
        return this.postService.create(postDto);
    }

    @Patch('/:id')
    updatePost(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdatePostDto){
        return this.postService.update(id,updateDto);
    }

    @Delete('/:id')
    deletePost(@Param('id', ParseIntPipe) id: number){
        return this.postService.delete(id);
    }

}
