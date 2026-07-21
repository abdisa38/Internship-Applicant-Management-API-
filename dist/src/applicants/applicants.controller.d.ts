import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto, UpdateApplicantDto, UpdateStatusDto, UpdateNotesDto } from './dto/applicants.dto';
export declare class ApplicantsController {
    private readonly applicantsService;
    constructor(applicantsService: ApplicantsService);
    create(createApplicantDto: CreateApplicantDto): Promise<{
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        phone: string | null;
        firstName: string;
        lastName: string;
        track: string;
        status: string;
        deletedAt: Date | null;
    }>;
    findAll(query: any): Promise<{
        data: {
            id: number;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            phone: string | null;
            firstName: string;
            lastName: string;
            track: string;
            status: string;
            deletedAt: Date | null;
        }[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    findOne(id: number): Promise<{
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        phone: string | null;
        firstName: string;
        lastName: string;
        track: string;
        status: string;
        deletedAt: Date | null;
    }>;
    update(id: number, updateApplicantDto: UpdateApplicantDto): Promise<{
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        phone: string | null;
        firstName: string;
        lastName: string;
        track: string;
        status: string;
        deletedAt: Date | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        phone: string | null;
        firstName: string;
        lastName: string;
        track: string;
        status: string;
        deletedAt: Date | null;
    }>;
    updateStatus(id: number, updateStatusDto: UpdateStatusDto): Promise<{
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        phone: string | null;
        firstName: string;
        lastName: string;
        track: string;
        status: string;
        deletedAt: Date | null;
    }>;
    updateNotes(id: number, updateNotesDto: UpdateNotesDto): Promise<{
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        phone: string | null;
        firstName: string;
        lastName: string;
        track: string;
        status: string;
        deletedAt: Date | null;
    }>;
}
