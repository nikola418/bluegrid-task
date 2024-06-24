import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { RestTestModule } from './rest-test/rest-test.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [RestTestModule],
  controllers: [FilesController],
  providers: [FilesService, TasksService],
})
export class FilesModule {}
