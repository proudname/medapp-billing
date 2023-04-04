import { Test, TestingModule } from '@nestjs/testing';
import { PromoService } from './promo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Promo } from './entities/promo.entity';

describe('PromoService', () => {
  let service: PromoService;
  let repoSave: jest.Mock;
  let qrSave: jest.Mock;
  let qrFindOneBy: jest.Mock;

  beforeEach(async () => {
    repoSave = jest.fn();
    qrSave = jest.fn();
    qrFindOneBy = jest.fn().mockImplementation((type) => {
      if (type === Promo) {
        return {
          id: 1,
          userId: '1',
          used: 0,
          usageLimit: 1,
          bonus: 10,
        };
      }
      return null;
    });
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromoService,
        {
          provide: getRepositoryToken(Promo),
          useValue: {
            save: repoSave,
            queryRunner: {
              manager: {
                findOneBy: qrFindOneBy,
                save: qrSave,
              },
              connect: jest.fn(),
              startTransaction: jest.fn(),
              rollbackTransaction: jest.fn(),
              commitTransaction: jest.fn(),
              release: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PromoService>(PromoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate promo code for user', async () => {
    repoSave.mockResolvedValueOnce(true);
    const promoCode = await service.generate({ userId: '1' });
    expect(promoCode).toHaveLength(6);
  });

  it('should use promo code', async () => {
    const useResult = await service.use({ code: '123456', userId: 'fake' });
    expect(qrSave).toHaveBeenCalledTimes(4);
    expect(useResult).toBe('OK');
  });
});
