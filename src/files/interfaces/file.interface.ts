export interface Directory {
  ['directoryName']?: DirectoryMembers;
}

export type DirectoryMembers = Array<Directory | string>;
