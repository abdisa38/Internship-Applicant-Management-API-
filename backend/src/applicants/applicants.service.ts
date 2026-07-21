import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicantDto, UpdateApplicantDto, UpdateStatusDto, UpdateNotesDto } from './dto/applicants.dto';

@Injectable()
export class ApplicantsService {
  constructor(private prisma: PrismaService) {}

  async create(createApplicantDto: CreateApplicantDto) {
    const existing = await this.prisma.applicant.findUnique({
      where: { email: createApplicantDto.email },
    });
    if (existing) {
      throw new BadRequestException('Email already in use');
    }
    return this.prisma.applicant.create({
      data: createApplicantDto,
    });
  }

  async findAll(query: any) {
    const { page = 1, limit = 10, search, status, track, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const where: any = {
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
      ];
    }
    if (status) {
      where.status = status;
    }
    if (track) {
      where.track = track;
    }

    const [data, total] = await Promise.all([
      this.prisma.applicant.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.applicant.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: pageNumber,
        lastPage: Math.ceil(total / pageSize),
      },
    };
  }

  async findOne(id: number) {
    const applicant = await this.prisma.applicant.findFirst({
      where: { id, deletedAt: null },
    });
    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }
    return applicant;
  }

  async update(id: number, updateApplicantDto: UpdateApplicantDto) {
    await this.findOne(id); // Check exists
    if (updateApplicantDto.email) {
      const existing = await this.prisma.applicant.findFirst({
        where: { email: updateApplicantDto.email, id: { not: id } },
      });
      if (existing) {
        throw new BadRequestException('Email already in use');
      }
    }
    return this.prisma.applicant.update({
      where: { id },
      data: updateApplicantDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.applicant.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async updateStatus(id: number, updateStatusDto: UpdateStatusDto) {
    const applicant = await this.findOne(id);
    if (applicant.status === 'Rejected' && updateStatusDto.status === 'Accepted') {
      throw new BadRequestException('Cannot move directly from Rejected to Accepted');
    }
    return this.prisma.applicant.update({
      where: { id },
      data: { status: updateStatusDto.status },
    });
  }

  async updateNotes(id: number, updateNotesDto: UpdateNotesDto) {
    await this.findOne(id);
    return this.prisma.applicant.update({
      where: { id },
      data: { notes: updateNotesDto.notes },
    });
  }
}
