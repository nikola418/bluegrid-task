import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { RestTestService } from './rest-test/rest-test.service';
import { RestTestModule } from './rest-test/rest-test.module';
import { of } from 'rxjs';
import { ParsedFile } from './rest-test/interfaces';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RestTestModule],
      providers: [FilesService],
    })
      .overrideProvider(RestTestService)
      .useValue({
        getAll: () =>
          of<ParsedFile[]>([
            {
              directoryNames: ['34.8.32.234', 'SvnRep', 'ADV-H5-New'],
              fileName: 'README.txt',
            },
            {
              directoryNames: ['34.8.32.234', 'SvnRep', 'ADV-H5-New'],
              fileName: 'VisualSVN.lck',
            },
            {
              directoryNames: ['34.8.32.234', 'SvnRep', 'ADV-H5-New'],
              fileName: 'hooks-env.tmpl',
            },
            {
              directoryNames: ['34.8.32.234', 'SvnRep', 'AT-APP'],
              fileName: 'README.txt',
            },
            {
              directoryNames: ['34.8.32.234', 'SvnRep', 'AT-APP'],
              fileName: 'VisualSVN.lck',
            },
            {
              directoryNames: ['34.8.32.234', 'SvnRep', 'AT-APP'],
              fileName: 'hooks-env.tmpl',
            },
            {
              directoryNames: ['34.8.32.234', 'SvnRep'],
              fileName: 'README.txt',
            },
            {
              directoryNames: ['34.8.32.234', 'SvnRep'],
              fileName: 'VisualSVN.lck',
            },
            {
              directoryNames: ['34.8.32.234', 'SvnRep'],
              fileName: 'hooks-env.tmpl',
            },
            {
              directoryNames: ['34.8.32.234', 'www'],
              fileName: 'README.txt',
            },
            {
              directoryNames: ['34.8.32.234', 'www'],
              fileName: 'VisualSVN.lck',
            },
            {
              directoryNames: ['34.8.32.234', 'www'],
              fileName: 'hooks-env.tmpl',
            },
          ]),
      })
      .compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct filesystem', () => {
    service.findAll().subscribe((res) => {
      expect(res).toEqual({
        '34.8.32.234': [
          {
            SvnRep: [
              {
                'ADV-H5-New': ['README.txt', 'VisualSVN.lck', 'hooks-env.tmpl'],
              },
              {
                'AT-APP': ['README.txt', 'VisualSVN.lck', 'hooks-env.tmpl'],
              },
              'README.txt',
              'VisualSVN.lck',
              'hooks-env.tmpl',
            ],
          },
          {
            www: ['README.txt', 'VisualSVN.lck', 'hooks-env.tmpl'],
          },
        ],
      });
    });
  });
});
