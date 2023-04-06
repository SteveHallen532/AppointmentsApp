import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaDietaListComponent } from './plantilla-dieta-list.component';

describe('PlantillaDietaListComponent', () => {
  let component: PlantillaDietaListComponent;
  let fixture: ComponentFixture<PlantillaDietaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaDietaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaDietaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
