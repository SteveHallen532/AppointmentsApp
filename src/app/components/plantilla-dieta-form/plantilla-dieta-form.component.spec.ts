import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaDietaFormComponent } from './plantilla-dieta-form.component';

describe('PlantillaDietaFormComponent', () => {
  let component: PlantillaDietaFormComponent;
  let fixture: ComponentFixture<PlantillaDietaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaDietaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaDietaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
