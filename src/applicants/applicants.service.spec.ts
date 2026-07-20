import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantsService } from './applicants.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ApplicantsService', () => {
  let service: ApplicantsService;

  const mockPrismaService = {
    applicant: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicantsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ApplicantsService>(ApplicantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an applicant successfully', async () => {
    const dto = { firstName: 'Test', lastName: 'User', email: 'test@example.com', track: 'Frontend Development' };
    mockPrismaService.applicant.findUnique.mockResolvedValue(null);
    mockPrismaService.applicant.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);
    expect(result.id).toBe(1);
    expect(mockPrismaService.applicant.create).toHaveBeenCalledWith({ data: dto });
  });

  it('should throw error if email exists', async () => {
    const dto = { firstName: 'Test', lastName: 'User', email: 'test@example.com', track: 'Frontend Development' };
    mockPrismaService.applicant.findUnique.mockResolvedValue({ id: 1, ...dto });

    await expect(service.create(dto)).rejects.toThrow('Email already in use');
  });
});
