import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternshipController } from './internship.controller';
import { InternshipService } from './internship.service';
import InternshipEntity from 'src/typeORM/entities/internship.entity';
import CompanyEntity from 'src/typeORM/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InternshipEntity, CompanyEntity])],
  controllers: [InternshipController],
  providers: [InternshipService],
  exports: [InternshipService],
})
export class InternshipModule {}
