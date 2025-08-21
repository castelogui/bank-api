import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../src/common/prisma/prisma.service';
import { CommonModule } from '../../src/common/common.module';
import { User } from '../../generated/prisma';
import { isArray } from 'class-validator';

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

  describe('🔹create', () => {
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

    it('a new user must be created but cannot return fields password, cpfCnpj, email', async () => {
      const user = await service.create({
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        cpfCnpj: '12345678900',
        password: '098751425'
      }) as User

      expect(user).toHaveProperty('id');
      expect(user.name).toBe('Usuario Teste')
      expect(user).not.toHaveProperty('password')
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

    it('should throw generic error if PrismaService fails (e.g.: DB disconnected)', async () => {
      jest.spyOn(prisma.user, 'create').mockRejectedValue(new Error('DB error'));

      await expect(
        service.create({
          name: 'Usuario Teste',
          email: 'usuario@teste.com',
          cpfCnpj: '12345678900',
          password: '123456'
        })
      ).rejects.toThrow('DB error');
    })
  })

  describe('🔹findAll', () => {
    it('should be return a user list', async () => {
      await service.create({
        name: 'Usuario Teste 1',
        email: 'usuario1@teste.com',
        cpfCnpj: '12345678901',
        password: '098751425'
      })
      await service.create({
        name: 'Usuario Teste 2',
        email: 'usuario2@teste.com',
        cpfCnpj: '12345678902',
        password: '098751425'
      })
      await service.create({
        name: 'Usuario Teste 3',
        email: 'usuario3@teste.com 3',
        cpfCnpj: '12345678903',
        password: '098751425'
      })
      const users = await service.findAll()

      expect(Array.isArray(users)).toBe(true)
      expect(users.length).toBeGreaterThanOrEqual(0)
      users.forEach(user => {
        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('name')
      }
      )
    })

    it('should be return a user list but cannot return fields password, cpfCnpj, email', async () => {
      await service.create({
        name: 'Usuario Teste 1',
        email: 'usuario1@teste.com',
        cpfCnpj: '12345678901',
        password: '098751425'
      })
      await service.create({
        name: 'Usuario Teste 2',
        email: 'usuario2@teste.com',
        cpfCnpj: '12345678902',
        password: '098751425'
      })
      await service.create({
        name: 'Usuario Teste 3',
        email: 'usuario3@teste.com 3',
        cpfCnpj: '12345678903',
        password: '098751425'
      })
      const users = await service.findAll()

      expect(Array.isArray(users)).toBe(true)
      expect(users.length).toBeGreaterThanOrEqual(0)

      users.forEach(user => {
        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('name')
        expect(user).not.toHaveProperty('password')
      }
      )
    })

    it('should return an empty array case if there are no users', async () => {
      const users = await service.findAll()

      expect(Array.isArray(users)).toBe(true)
      expect(users.length).toBe(0)
    })
  })

  describe('🔹findOne', () => {
    it('should be return a user by id', async () => {
      const user = await service.create({
        name: 'Usuario Teste 3',
        email: 'usuario3@teste.com 3',
        cpfCnpj: '12345678903',
        password: '098751425'
      }) as User

      const result = await service.findOne({ id: user.id }) as User
      expect(result).toHaveProperty("id")
      expect(result.id).toBe(user.id)
    })

    it('should be return a user by email', async () => {
      const user = await service.create({
        name: 'Usuario Teste 3',
        email: 'usuario3@teste.com 3',
        cpfCnpj: '12345678903',
        password: '098751425'
      }) as User

      const result = await service.findOne({ email: user.email }) as User
      expect(result).toHaveProperty("id")
      expect(result.email).toBe(user.email)
    })

    it('should be return a user by cpf', async () => {
      const user = await service.create({
        name: 'Usuario Teste 3',
        email: 'usuario3@teste.com 3',
        cpfCnpj: '12345678903',
        password: '098751425'
      }) as User

      const result = await service.findOne({ cpfCnpj: user.cpfCnpj }) as User
      expect(result).toHaveProperty("id")
      expect(result.cpfCnpj).toBe(user.cpfCnpj)
    })

    it('should be return a user by id, email or cpf but not return password value', async () => {
      const user = await service.create({
        name: 'Usuario Teste 3',
        email: 'usuario3@teste.com 3',
        cpfCnpj: '12345678903',
        password: '098751425'
      }) as User

      const result_id = await service.findOne({ id: user.id }) as User
      expect(result_id.id).toBe(user.id)
      expect(result_id).not.toHaveProperty('password')
      const result_email = await service.findOne({ email: user.email }) as User
      expect(result_email.email).toBe(user.email)
      expect(result_email).not.toHaveProperty('password')
      const result_cpfCnpjf = await service.findOne({ cpfCnpj: user.cpfCnpj }) as User
      expect(result_cpfCnpjf.cpfCnpj).toBe(user.cpfCnpj)
      expect(result_cpfCnpjf).not.toHaveProperty('password')
    })
  })
});
