import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { of } from 'rxjs';

describe('FilesController', () => {
  let controller: FilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [FilesService],
    })
      .overrideProvider(FilesService)
      .useValue({
        findAll: () =>
          of({
            '34.8.32.234': [
              {
                SvnRep: [
                  {
                    'ADV-H5-New': [
                      'README.txt',
                      'VisualSVN.lck',
                      'hooks-env.tmpl',
                    ],
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
          }),
      })
      .compile();

    controller = module.get<FilesController>(FilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return correct filesystem', () => {
    controller.findAll().subscribe((res) => {
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
