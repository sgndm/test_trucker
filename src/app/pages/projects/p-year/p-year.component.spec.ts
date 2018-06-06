import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PYearComponent } from './p-year.component';

describe('PYearComponent', () => {
  let component: PYearComponent;
  let fixture: ComponentFixture<PYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
