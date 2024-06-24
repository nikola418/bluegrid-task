import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FilesService } from './files.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TasksService {
  constructor(
    private readonly filesService: FilesService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_10_SECONDS) //For demonstration purposes, a sparser job schedule would be more adequate
  public runFilesServiceFindAllCronJob(): void {
    this.logger.log('runRestTestServiceGetAllCronJob triggered!');
    this.filesService
      .findAll()
      .subscribe((fileSystem) =>
        this.cacheManager.set('fileSystem', fileSystem, 1000 * 3600 * 24),
      );
  }
}
