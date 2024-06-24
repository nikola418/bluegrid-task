import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Observable, map } from 'rxjs';
import { ParsedFile, TestResponse } from './interfaces';

@Injectable()
export class RestTestService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  private readonly logger = new Logger(RestTestService.name);

  public getAll(): Observable<ParsedFile[]> {
    this.logger.log(`Getting files from ${this.httpService.axiosRef.getUri()}`);

    return this.httpService.get<TestResponse>('').pipe(
      map((res) => {
        this.logger.log(`Parsing file Urls`);
        return res.data.items.map<ParsedFile>((item) => {
          const pathParts = item.fileUrl.split('//').pop().split('/');
          const fileName = pathParts.pop();
          const ipAddress = pathParts.shift().split(':').shift();
          pathParts.unshift(ipAddress);
          const directoryNames = pathParts;
          return {
            directoryNames,
            fileName: fileName !== '' ? fileName : undefined,
          };
        });
      }),
    );
  }
}
