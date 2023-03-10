import { IsEmail, IsString, IsNotEmpty, IsNumberString } from "class-validator";

export class CommentDto {

    @IsNumberString()
    id: number;
    
    @IsNumberString()
    postId: number;

    @IsString()
    @IsNotEmpty()
    content: string;
    
    @IsNotEmpty()
    @IsEmail()
    authorEmail: string;
}