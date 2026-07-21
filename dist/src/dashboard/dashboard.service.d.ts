import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getSummary(): Promise<{
        total: number;
        byStatus: {
            status: string;
            count: number;
        }[];
        byTrack: {
            track: string;
            count: number;
        }[];
    }>;
}
