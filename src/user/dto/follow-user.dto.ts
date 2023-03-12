import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class FollowUserDto {
 
    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    userToFollow: number;

    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    currentUser: number;
}