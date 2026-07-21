import { Module } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { ApplicantsController } from './applicants.controller';

@Module({
  providers: [ApplicantsService],
  controllers: [ApplicantsController]
})
export class ApplicantsModule {}
