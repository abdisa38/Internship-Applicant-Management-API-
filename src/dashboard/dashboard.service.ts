import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const where = { deletedAt: null };
    const [total, byStatus, byTrack] = await Promise.all([
      this.prisma.applicant.count({ where }),
      this.prisma.applicant.groupBy({
        by: ['status'],
        where,
        _count: { status: true },
      }),
      this.prisma.applicant.groupBy({
        by: ['track'],
        where,
        _count: { track: true },
      }),
    ]);

    return {
      total,
      byStatus: byStatus.map(item => ({ status: item.status, count: item._count.status })),
      byTrack: byTrack.map(item => ({ track: item.track, count: item._count.track })),
    };
  }
}
