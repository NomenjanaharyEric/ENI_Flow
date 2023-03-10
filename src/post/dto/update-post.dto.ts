import { IsString, IsNotEmpty } from "class-validator";

export class UpdatePostDto {
    
    id: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    content: string;

}