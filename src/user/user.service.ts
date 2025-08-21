import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from '../../src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.UserCreateInput): Promise<Omit<User, 'password'> | Error> {
    try {
      return await this.prisma.user.create({
        data, select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          cpfCnpj: true
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Array<Omit<User, 'password'>>> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        cpfCnpj: true
      }
    });
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.findUnique({
      where, select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        cpfCnpj: true
      }
    });
  }

  async update(params: {
    data: Prisma.UserUpdateInput,
    where: Prisma.UserWhereUniqueInput
  }): Promise<Omit<User, 'password'>> {
    const { data, where } = params
    return this.prisma.user.update({
      data, where, select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        cpfCnpj: true
      }
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<Omit<User, 'password'>> {
    return this.prisma.user.delete({
      where, select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        cpfCnpj: true
      }
    });
  }
}
