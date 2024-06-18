import { ApiProperty } from '@nestjs/swagger';
import { Directory, DirectoryMembers } from '../interfaces';

export class DirectoryEntity implements Directory {
  @ApiProperty({
    description: 'List of contained Directories and Files',
  })
  ['directoryName']?: DirectoryMembers;
}
