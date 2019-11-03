import { TestBed } from '@angular/core/testing';

import { TilesetService } from './tileset.service';

describe('TilesetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TilesetService = TestBed.get(TilesetService);
    expect(service).toBeTruthy();
  });
});
