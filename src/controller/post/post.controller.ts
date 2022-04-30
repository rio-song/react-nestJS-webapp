import { Body, Controller, Get, Post, Put, Param, Request } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { GetAllPostsRequest } from './request/get-all-posts-request'
import { PutUserRequest } from './request/put-user-request'
import { GetAllPostsResponse } from 
import { GetAllPostsUseCase } from 'src/app/post/usecase/get-all-posts-usecase'
// import { PostUserUseCase } from '../app/user-usecase/post-user-usecase'
// import { PutUserUseCase } from '../app/user-usecase/put-user-usecase'
// import { UserRepository } from 'src/infra/db/repository/user-repository'
// import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { PostQS } from 'src/infra/post/post-qs'


@Controller({
    path: 'api/post',
})
export class PostController {
    @Get()
    async getAllUsers(@Body() getAllPostsDto: GetAllPostsRequest): Promise<GetAllPostsResponse> {
        const prisma = new PrismaClient()
        const qs = new PostQS(prisma)
        const usecase = new GetAllPostsUseCase(qs)
        const result = await usecase.do({
            count: getAllPostsDto.count,
            lastPostId: getAllPostsDto.lastPostId
        })
        const response = new GetAllPostsResponse({ Posts: result })
        return response
    }


    @Get()
    async getProjects(@Res() res): Promise<ProjectDto[]> {
        return await this.projectService.getProjects(0, 0).then(projects => res.json(projects));
    }
    @Get('api/post/:userId/')
    async getProject(@Param('userId') id, @Res() res): Promise<ProjectDto> {
        return await this.projectService.getProjects(id).then(project => res.json(project[0]));
    }

    @Get('/authors')
    async getAuthors(@Res() res): Promise<AuthorDto[]> {
        return await this.projectService.getAuthors().then(authors => res.json(authors));
    }


    @Post()
    async postUser(
        @Param() userId: string,
        @Body() postUserDto: PostUserRequest,
    ): Promise<void> {
        const userId2 = request.params[userId]
        const prisma = new PrismaClient()
        const userRepo = new UserRepository(prisma)
        const teamRepo = new TeamRepository(prisma)
        const usecase = new PostUserUseCase(userRepo, teamRepo)
        await usecase.do({
            lastName: postUserDto.lastName,
            firstName: postUserDto.firstName,
            email: postUserDto.email,
            userStatus: postUserDto.userStatus,
        })
    }

    @Put()
    async putUser(
        @Body() putUserDto: PutUserRequest,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const repoUser = new UserRepository(prisma)
        const teamRepo = new TeamRepository(prisma)
        const userQS = new UserQS(prisma)
        const usecase = new PutUserUseCase(userQS, repoUser, teamRepo)
        await usecase.do({
            lastName: putUserDto.lastName,
            firstName: putUserDto.firstName,
            email: putUserDto.email,
            userStatus: putUserDto.userStatus,
        })
    }

}
