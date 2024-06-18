import { Test, TestingModule } from '@nestjs/testing';
import { RestTestService } from './rest-test.service';
import { of } from 'rxjs';
import { AxiosResponse, AxiosInstance } from 'axios';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ParsedFile, TestResponse } from './interfaces';

describe('RestTestService', () => {
  let service: RestTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule.register({ baseURL: '' })],
      providers: [RestTestService],
    })
      .overrideProvider(HttpService)
      .useValue({
        axiosRef: <AxiosInstance>{ getUri: () => '' },
        get: () =>
          of(<AxiosResponse<TestResponse>>{
            data: {
              items: [
                {
                  fileUrl:
                    'http://34.8.32.234:48183/SvnRep/ADV-H5-New/README.txt',
                },
                {
                  fileUrl:
                    'http://34.8.32.234:48183/SvnRep/ADV-H5-New/VisualSVN.lck',
                },
                {
                  fileUrl:
                    'http://34.8.32.234:48183/SvnRep/ADV-H5-New/hooks-env.tmpl',
                },
                {
                  fileUrl: 'http://34.8.32.234:48183/SvnRep/AT-APP/README.txt',
                },
                {
                  fileUrl:
                    'http://34.8.32.234:48183/SvnRep/AT-APP/VisualSVN.lck',
                },
                {
                  fileUrl:
                    'http://34.8.32.234:48183/SvnRep/AT-APP/hooks-env.tmpl',
                },
                { fileUrl: 'http://34.8.32.234:48183/SvnRep/README.txt' },
                { fileUrl: 'http://34.8.32.234:48183/SvnRep/VisualSVN.lck' },
                { fileUrl: 'http://34.8.32.234:48183/SvnRep/hooks-env.tmpl' },
                { fileUrl: 'http://34.8.32.234:48183/www/README.txt' },
                { fileUrl: 'http://34.8.32.234:48183/www/VisualSVN.lck' },
                { fileUrl: 'http://34.8.32.234:48183/www/hooks-env.tmpl' },
              ],
            },
          }),
      })
      .compile();

    service = module.get<RestTestService>(RestTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list of parsed files with directories and fileName', () => {
    service.getAll().subscribe((res) => {
      expect(res).toEqual(<ParsedFile[]>[
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
      ]);
    });
  });
});
