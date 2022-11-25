import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`getAll`, () => {
    it(`should return Array`, () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe(`getOne`, () => {
    it(`should be return movie`, () => {
      service.create({
        title: `Test Movie`,
        genres: [`test`],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });
    it(`should throw NotFoundException`, () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 999 not found.`);
      }
    });
  });

  describe(`deleteOne`, () => {
    it(`delete a movie`, () => {
      service.create({
        title: `Test Movie`,
        genres: [`test`],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it(`should throw NotFoundException`, () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe(`update`, () => {
    it(`should update MOIVE`, () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: `Updated Title` });
      const movie = service.getOne(1);
      expect(movie.title).toEqual(`Updated Title`);
    });
    it(`should throw NotFoundException`, () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
