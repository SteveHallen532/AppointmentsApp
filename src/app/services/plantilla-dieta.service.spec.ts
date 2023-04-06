import { TestBed } from '@angular/core/testing';

import { PlantillaDietaService } from './plantilla-dieta.service';

describe('PlantillaDietaService', () => {
  let service: PlantillaDietaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaDietaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
