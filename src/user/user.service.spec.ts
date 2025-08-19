import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../src/common/prisma/prisma.service';
import { CommonModule } from '../../src/common/common.module';
import { User } from '../../generated/prisma';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService

  beforeEach(async () => {
    prisma = new PrismaService()
    await prisma.user.deleteMany()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prisma }
      ],
      imports: [CommonModule]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('user-> create', () => {
    it('should be create a new user', async () => {
      const user = await service.create({
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        cpfCnpj: '12345678900',
        password: '098751425'
      }) as User

      expect(user).toHaveProperty('id');
      expect(user.name).toBe('Usuario Teste')
    })

    it('should not be create a user with the same email', async () => {
      await service.create({
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        cpfCnpj: '12345678900',
        password: '098751425'
      })

      await expect(
        service.create({
          name: 'Outro Usuario',
          email: 'usuario@teste.com',
          cpfCnpj: '98765432100',
          password: '123456'
        })
      ).rejects.toThrow(/Unique constraint failed/);
    });

    it('should not be create a user with the same cpf', async () => {
      await service.create({
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        cpfCnpj: '12345678900',
        password: '098751425'
      });

      await expect(
        service.create({
          name: 'Outro Usuario',
          email: 'usuario2@teste.com',
          cpfCnpj: '12345678900',
          password: '123456'
        })
      ).rejects.toThrow(/Unique constraint failed/);
    });

  })
});
