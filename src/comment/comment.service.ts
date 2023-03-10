import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Comment } from "@prisma/client";
import { CommentDto } from "./dto";

@Injectable()
export class CommentService{

    constructor(private prisma: PrismaService){}

    async create(commentDto: CommentDto): Promise<Comment>
    {
        const comment = await this.prisma.comment.create({
            data: {
                content: commentDto.content,
                author: {
                    connect: { email: commentDto.authorEmail }
                },
                post: {
                    connect: { id: commentDto.postId }
                }
            }
        });
        return comment;
    }

    async findAll() : Promise<Comment[]>
    {
        const comments = await this.prisma.comment.findMany();
        return comments;
    }

    async findOne(id: number): Promise<Comment>
    {
        return this.prisma.comment.findUnique({
            where: { id }
        })
    }

    async findByPost(postId: number): Promise<Comment[]>
    {
        return this.prisma.comment.findMany({
            where: { postId }
        })
    }

    async update(id: number, commentDto: CommentDto): Promise<Comment>
    {
        const comment = await this.prisma.comment.update({
            where: { id },
            data: {
                content: commentDto.content
            }
        });
        return comment;
    }

    async remove(id:number): Promise<Comment>
    {
        return this.prisma.comment.delete({ where: { id }});
    }

}