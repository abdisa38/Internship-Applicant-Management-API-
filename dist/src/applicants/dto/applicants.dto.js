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
exports.UpdateNotesDto = exports.UpdateStatusDto = exports.UpdateApplicantDto = exports.CreateApplicantDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const TRACKS = ['Frontend Development', 'Backend Development', 'Mobile Development', 'UI/UX Design', 'Data Analytics'];
class CreateApplicantDto {
    firstName;
    lastName;
    email;
    phone;
    track;
}
exports.CreateApplicantDto = CreateApplicantDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateApplicantDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateApplicantDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateApplicantDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+1234567890' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateApplicantDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Backend Development', enum: TRACKS }),
    (0, class_validator_1.IsIn)(TRACKS),
    __metadata("design:type", String)
], CreateApplicantDto.prototype, "track", void 0);
class UpdateApplicantDto {
    firstName;
    lastName;
    email;
    phone;
    track;
}
exports.UpdateApplicantDto = UpdateApplicantDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'John' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateApplicantDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateApplicantDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'john.doe@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateApplicantDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+1234567890' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateApplicantDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Backend Development', enum: TRACKS }),
    (0, class_validator_1.IsIn)(TRACKS),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateApplicantDto.prototype, "track", void 0);
const STATUSES = ['Pending', 'Shortlisted', 'Accepted', 'Rejected'];
class UpdateStatusDto {
    status;
}
exports.UpdateStatusDto = UpdateStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Shortlisted', enum: STATUSES }),
    (0, class_validator_1.IsIn)(STATUSES),
    __metadata("design:type", String)
], UpdateStatusDto.prototype, "status", void 0);
class UpdateNotesDto {
    notes;
}
exports.UpdateNotesDto = UpdateNotesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Candidate showed strong problem solving skills.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateNotesDto.prototype, "notes", void 0);
//# sourceMappingURL=applicants.dto.js.map