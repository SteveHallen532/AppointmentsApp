import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaDietaComponent } from './plantilla-dieta.component';

describe('PlantillaDietaComponent', () => {
  let component: PlantillaDietaComponent;
  let fixture: ComponentFixture<PlantillaDietaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaDietaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
