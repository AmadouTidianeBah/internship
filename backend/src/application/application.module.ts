import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import ApplicationEntity from 'src/typeORM/entities/application.entity';
import InternshipEntity from 'src/typeORM/entities/internship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity, InternshipEntity])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
