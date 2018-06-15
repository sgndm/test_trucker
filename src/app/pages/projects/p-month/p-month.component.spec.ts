import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMonthComponent } from './p-month.component';

describe('PMonthComponent', () => {
  let component: PMonthComponent;
  let fixture: ComponentFixture<PMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
