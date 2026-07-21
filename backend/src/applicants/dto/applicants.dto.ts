import { IsEmail, IsNotEmpty, IsOptional, IsString, IsIn, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const TRACKS = ['Frontend Development', 'Backend Development', 'Mobile Development', 'UI/UX Design', 'Data Analytics'];

export class CreateApplicantDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Backend Development', enum: TRACKS })
  @IsIn(TRACKS)
  track: string;
}

export class UpdateApplicantDto {
  @ApiPropertyOptional({ example: 'John' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({ example: 'john.doe@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'Backend Development', enum: TRACKS })
  @IsIn(TRACKS)
  @IsOptional()
  track?: string;
}

const STATUSES = ['Pending', 'Shortlisted', 'Accepted', 'Rejected'];

export class UpdateStatusDto {
  @ApiProperty({ example: 'Shortlisted', enum: STATUSES })
  @IsIn(STATUSES)
  status: string;
}

export class UpdateNotesDto {
  @ApiProperty({ example: 'Candidate showed strong problem solving skills.' })
  @IsString()
  @MaxLength(1000)
  notes: string;
}
