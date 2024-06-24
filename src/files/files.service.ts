import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Observable, map } from 'rxjs';
import { Directory, DirectoryMembers } from './interfaces';
import { ParsedFile } from './rest-test/interfaces';
import { RestTestService } from './rest-test/rest-test.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly restTestService: RestTestService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  private readonly logger = new Logger(FilesService.name);

  public findAll(): Observable<Directory> {
    return this.restTestService
      .getAll()
      .pipe(
        map((parsedFileUrls) => this.reconstructFileSystem(parsedFileUrls)),
      );
  }

  private reconstructFileSystem(parsedFileUrls: ParsedFile[]): Directory {
    const start = Date.now();
    this.logger.log('Reconstructing filesystem');
    const fileSystem: Directory = {};
    parsedFileUrls.forEach((parsedFile) => {
      const ipAddress = parsedFile.directoryNames.shift();
      if (!fileSystem[ipAddress]) fileSystem[ipAddress] = Array.of();

      let directoryMembers: DirectoryMembers = fileSystem[ipAddress];

      parsedFile.directoryNames.forEach((part) => {
        let currentDirectory: Directory = directoryMembers.find<Directory>(
          (dir): dir is Directory =>
            typeof dir === 'object' && Object.keys(dir)[0] === part,
        );

        if (!currentDirectory) {
          currentDirectory = { [part]: Array.of() };
          directoryMembers.push(currentDirectory);
        }
        directoryMembers = currentDirectory[part];
      });

      if (parsedFile.fileName) {
        directoryMembers.push(parsedFile.fileName);
      }
    });
    this.logger.log(`Reconstructed files in ${Date.now() - start}ms`);
    return fileSystem;
  }
}
