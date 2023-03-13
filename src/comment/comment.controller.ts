import { Controller, Get, Post,Patch,Delete,Body, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { CommentService } from "./comment.service";
import { AnswerDto, CommentDto } from "./dto";

@Controller("comments")
export class CommentController{

    constructor(private commentService: CommentService){}

    @Post()
    @UseGuards(JwtGuard)
    create(@Body() commentDto: CommentDto){
        return this.commentService.create(commentDto);
    }

    @Post('/answer')
    @UseGuards(JwtGuard)
    answer(@Body() answerDto: AnswerDto){
        return this.commentService.answer(answerDto);
    }

    @Get()
    @UseGuards(JwtGuard)
    findAll(){
        return this.commentService.findAll();
    }

    @Get('/:id')
    @UseGuards(JwtGuard)
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.commentService.findOne(id);
    }

    @Get('/post/:postId')
    @UseGuards(JwtGuard)
    findByPost(@Param('postId', ParseIntPipe) postId: number){
        return this.commentService.findByPost(postId);
    }

    @Patch('/:id')
    @UseGuards(JwtGuard)
    update(@Param('id', ParseIntPipe) id: number, @Body() comment: CommentDto){
        return this.commentService.update(id, comment);
    }
    
    @Delete('/:id')
    @UseGuards(JwtGuard)
    remove(@Param('id', ParseIntPipe) id: number){
        return this.commentService.remove(id);
    }

}