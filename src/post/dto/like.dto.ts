import { IsInt, IsNotEmpty } from "class-validator";

export class LikeDto{
    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    postId: number;
}