import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietsHistoryComponent } from './diets-history.component';

describe('DietsHistoryComponent', () => {
  let component: DietsHistoryComponent;
  let fixture: ComponentFixture<DietsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
