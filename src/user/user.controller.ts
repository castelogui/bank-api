import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser-dto';
import { UpdateUserDto } from './dto/updateUser-dto';
import { User } from 'generated/prisma';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User | Error> {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      return new Error(error)
    }
  }

  @Get()
  async findAll(): Promise<Array<User>> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update({ data, where: { id: Number(id) } });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove({ id: Number(id) });
  }
}
