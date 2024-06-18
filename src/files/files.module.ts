import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { RestTestModule } from './rest-test/rest-test.module';

@Module({
  imports: [RestTestModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
