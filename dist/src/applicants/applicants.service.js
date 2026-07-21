"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ApplicantsService = class ApplicantsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createApplicantDto) {
        const existing = await this.prisma.applicant.findUnique({
            where: { email: createApplicantDto.email },
        });
        if (existing) {
            throw new common_1.BadRequestException('Email already in use');
        }
        return this.prisma.applicant.create({
            data: createApplicantDto,
        });
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, status, track, sortBy = 'createdAt', sortOrder = 'desc' } = query;
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
        const skip = (pageNumber - 1) * pageSize;
        const where = {
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
    async findOne(id) {
        const applicant = await this.prisma.applicant.findFirst({
            where: { id, deletedAt: null },
        });
        if (!applicant) {
            throw new common_1.NotFoundException('Applicant not found');
        }
        return applicant;
    }
    async update(id, updateApplicantDto) {
        await this.findOne(id);
        if (updateApplicantDto.email) {
            const existing = await this.prisma.applicant.findFirst({
                where: { email: updateApplicantDto.email, id: { not: id } },
            });
            if (existing) {
                throw new common_1.BadRequestException('Email already in use');
            }
        }
        return this.prisma.applicant.update({
            where: { id },
            data: updateApplicantDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.applicant.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async updateStatus(id, updateStatusDto) {
        const applicant = await this.findOne(id);
        if (applicant.status === 'Rejected' && updateStatusDto.status === 'Accepted') {
            throw new common_1.BadRequestException('Cannot move directly from Rejected to Accepted');
        }
        return this.prisma.applicant.update({
            where: { id },
            data: { status: updateStatusDto.status },
        });
    }
    async updateNotes(id, updateNotesDto) {
        await this.findOne(id);
        return this.prisma.applicant.update({
            where: { id },
            data: { notes: updateNotesDto.notes },
        });
    }
};
exports.ApplicantsService = ApplicantsService;
exports.ApplicantsService = ApplicantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicantsService);
//# sourceMappingURL=applicants.service.js.map