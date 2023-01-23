import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellectPatientComponent } from './sellect-patient.component';

describe('SellectPatientComponent', () => {
  let component: SellectPatientComponent;
  let fixture: ComponentFixture<SellectPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellectPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellectPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
