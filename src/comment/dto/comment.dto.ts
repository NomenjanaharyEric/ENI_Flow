import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class CommentDto {
    
    @IsNotEmpty()
    postId: number;

    @IsString()
    @IsNotEmpty()
    content: string;
    
    @IsNotEmpty()
    @IsEmail()
    authorEmail: string;
}