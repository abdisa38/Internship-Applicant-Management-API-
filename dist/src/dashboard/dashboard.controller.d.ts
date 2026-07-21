import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
