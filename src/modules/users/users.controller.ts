import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.create(data)
  }

  @Get()
  async all() {
    return this.usersService.all()
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.usersService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: string)
  {
    return this.usersService.delete(id)
  }

  @Get(':id')
  async byId(@Param('id') id: string)
  {
    return this.usersService.byId(id)
  }
}
