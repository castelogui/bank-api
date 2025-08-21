import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from '../../src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.UserCreateInput): Promise<Omit<User, 'password' | 'email' | 'cpfCnpj'> | Error> {
    try {
      return await this.prisma.user.create({
        data, select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Array<Omit<User, 'password' | 'email' | 'cpfCnpj'>>> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where });
  }

  async update(params: {
    data: Prisma.UserUpdateInput,
    where: Prisma.UserWhereUniqueInput
  }): Promise<User> {
    const { data, where } = params
    return this.prisma.user.update({ data, where });
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
