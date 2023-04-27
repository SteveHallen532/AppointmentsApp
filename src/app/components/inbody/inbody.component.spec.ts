import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InbodyComponent } from './inbody.component';

describe('InbodyComponent', () => {
  let component: InbodyComponent;
  let fixture: ComponentFixture<InbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InbodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
