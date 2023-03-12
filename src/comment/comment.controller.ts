import { Controller, Get, Post,Patch,Delete,Body, Param, ParseIntPipe } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { AnswerDto, CommentDto } from "./dto";

@Controller("comments")
export class CommentController{

    constructor(private commentService: CommentService){}

    @Post()
    create(@Body() commentDto: CommentDto){
        return this.commentService.create(commentDto);
    }

    @Post('/answer')
    answer(@Body() answerDto: AnswerDto){
        return this.commentService.answer(answerDto);
    }

    @Get()
    findAll(){
        return this.commentService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.commentService.findOne(id);
    }

    @Get('/post/:postId')
    findByPost(@Param('postId', ParseIntPipe) postId: number){
        return this.commentService.findByPost(postId);
    }

    @Patch('/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() comment: CommentDto){
        return this.commentService.update(id, comment);
    }
    
    @Delete('/:id')
    remove(@Param('id', ParseIntPipe) id: number){
        return this.commentService.remove(id);
    }

}