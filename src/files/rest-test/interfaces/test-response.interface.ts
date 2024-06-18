interface FileUrl {
  ['fileUrl']: string;
}

export interface TestResponse {
  items: FileUrl[];
}

export interface ParsedFile {
  directoryNames: string[];
  fileName?: string;
}
