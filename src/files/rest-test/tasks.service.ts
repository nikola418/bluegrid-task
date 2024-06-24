import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RestTestService } from './rest-test.service';

@Injectable()
export class TasksService {
  constructor(private readonly restTestService: RestTestService) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_10_SECONDS) //For demonstration purposes, a sparser job schedule would be more adequate
  public runRestTestServiceGetAllCronJob(): void {
    this.logger.log('runRestTestServiceGetAllCronJob triggered!');
    this.restTestService.getAll().subscribe();
  }
}
