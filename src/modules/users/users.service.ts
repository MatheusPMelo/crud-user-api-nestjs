import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.UserCreateInput) {

        const userExists = await this.prisma.user.findFirst({
            where: {
                email: data.email
            }
        })

        if (userExists)
            throw new Error('User already exists')

        const user = await this.prisma.user.create({ data })

        return user
    }

    async all() {
        return await this.prisma.user.findMany({
            orderBy: {
                name: 'desc'
            }
        })
    }

    async update(id: string, data: Prisma.UserUpdateInput) {

        const userExists = await this.prisma.user.findFirst({
            where: {
                id: id
            }
        })

        if (!userExists)
            throw new Error('User not found')

        return this.prisma.user.update({
            data,
            where: {
                id: id
            },
        })

    }

    async delete(id: string) {
        const userExists = this.prisma.user.findFirst({
            where: {
                id
            }
        })

        if (!userExists)
            throw new Error('User does exists')

        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async byId(id: string) {
        const userExists = this.prisma.user.findFirst({
            where: {
                id
            }
        })

        if(!userExists)
            throw new Error("User does exists")

        return this.prisma.user.findFirst({
            where: {
                id
            }
        })
    }
}
