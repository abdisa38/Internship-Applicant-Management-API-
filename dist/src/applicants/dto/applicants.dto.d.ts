export declare class CreateApplicantDto {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    track: string;
}
export declare class UpdateApplicantDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    track?: string;
}
export declare class UpdateStatusDto {
    status: string;
}
export declare class UpdateNotesDto {
    notes: string;
}
