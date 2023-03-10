import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class PostDto {
    
    id: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    content: string;

    @IsString()
    @IsEmail()
    authorEmail: string;
}