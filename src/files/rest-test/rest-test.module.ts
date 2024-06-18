import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RestTestService } from './rest-test.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://rest-test-eight.vercel.app/api/test',
    }),
  ],
  providers: [RestTestService],
  exports: [RestTestService],
})
export class RestTestModule {}
