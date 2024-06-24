import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { Observable, from, of, switchMap } from 'rxjs';
import { DirectoryEntity } from './entity';
import { FilesService } from './files.service';
import { Directory } from './interfaces';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get()
  public findAll(): Observable<DirectoryEntity> {
    return from(this.cacheManager.get<Directory>('fileSystem')).pipe(
      switchMap((val) => {
        if (val) return of(val);

        return this.filesService.findAll();
      }),
    );
  }
}
