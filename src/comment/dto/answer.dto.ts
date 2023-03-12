import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AnswerDto{

    @IsNumber()
    @IsNotEmpty()
    postId: number;
    
    @IsNumber()
    @IsNotEmpty()
    commentId: number;

    @IsNumber()
    @IsNotEmpty()
    authorId: number;

    @IsString()
    @IsNotEmpty()
    comment: string;
}