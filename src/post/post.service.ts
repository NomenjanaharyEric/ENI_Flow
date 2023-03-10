import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from "@prisma/client";
import { PostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService){}

    async getAll(): Promise<Post[]>
    {
        const posts = await this.prisma.post.findMany();
        return posts;
    }

    async getOne(id: number): Promise<Post>
    {
        const post = await this.prisma.post.findUnique({
            where: { id }
        });
        return post;
    }

    async create(postDto: PostDto): Promise<Post>
    {
        const post = await this.prisma.post.create({
            data:{
                title: postDto.title,
                content: postDto.content,
                author: {
                    connect: { email: postDto.authorEmail}
                }
            }
        });
        return post;
    }

    async update(id: number, updatePost: UpdatePostDto): Promise<Post>
    {
        const post = await this.prisma.post.update({
            where: { id },
            data: {
                title: updatePost.title,
                content: updatePost.content
            }
        });

        return post;
    }

    async delete(id: number): Promise<Post>
    {
        return this.prisma.post.delete({ where: { id }});
    }
}
